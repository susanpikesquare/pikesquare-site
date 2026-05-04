import type { APIRoute } from 'astro';
import { sendPostmarkEmail, escapeHtml, type PostmarkAttachment } from '../../lib/postmark';

export const prerender = false;

// Postmark caps total attachment payload at ~10MB. Reject anything bigger
// upfront so we don't return a confusing API error from Postmark itself.
const MAX_ATTACHMENT_BYTES = 9 * 1024 * 1024;

function jsonResponse(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function arrayBufferToBase64(buf: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buf);
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

interface IntakeFields {
  name: string;
  email: string;
  company: string;
  projectType: string;
  description: string;
  timeline: string;
  budget: string;
  source: string;
  submittedAt: string;
}

function buildIntakeHtml(f: IntakeFields, fileSummary: string): string {
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:8px 12px;font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#594E86;width:140px;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 12px;font-size:14px;line-height:1.6;color:#210D10;">${escapeHtml(value).replace(/\n/g, '<br>')}</td></tr>`
      : '';

  return `
<!doctype html>
<html><head><meta charset="utf-8"><title>Quick-turn project intake</title></head>
<body style="margin:0;padding:0;background:#fafaf7;font-family:-apple-system,Segoe UI,sans-serif;color:#210D10;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:12px;border:1px solid rgba(33,13,16,.08);overflow:hidden;">
        <tr><td style="padding:24px 32px;background:#202971;color:#ffffff;">
          <p style="margin:0;font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#FFBB8A;">New intake</p>
          <h1 style="margin:6px 0 0;font-size:20px;line-height:1.3;">${escapeHtml(f.projectType || 'Quick-turn project')} from ${escapeHtml(f.name)}</h1>
        </td></tr>
        <tr><td style="padding:8px 20px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${row('Name', f.name)}
            ${row('Email', f.email)}
            ${row('Company', f.company)}
            ${row('Project type', f.projectType)}
            ${row('Timeline', f.timeline)}
            ${row('Budget', f.budget)}
            ${row('Description', f.description)}
            ${row('Attachments', fileSummary)}
            ${row('Source', f.source)}
            ${row('Submitted at', f.submittedAt)}
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`.trim();
}

function buildIntakeText(f: IntakeFields, fileSummary: string): string {
  const lines = [
    `New quick-turn project intake.`,
    '',
    `From: ${f.name} <${f.email}>`,
    f.company ? `Company: ${f.company}` : '',
    `Project type: ${f.projectType}`,
    `Timeline: ${f.timeline}`,
    f.budget ? `Budget: ${f.budget}` : '',
    '',
    'Description:',
    f.description,
    '',
    fileSummary ? `Attachments: ${fileSummary}` : '',
    f.source ? `Source: ${f.source}` : '',
    f.submittedAt ? `Submitted at: ${f.submittedAt}` : '',
  ];
  return lines.filter(Boolean).join('\n');
}

export const POST: APIRoute = async ({ request }) => {
  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return jsonResponse(400, { ok: false, error: 'Invalid form data' });
  }

  // Honeypot
  if ((fd.get('_gotcha') ?? '').toString().trim() !== '') {
    return jsonResponse(200, { ok: true });
  }

  const fields: IntakeFields = {
    name: (fd.get('name') ?? '').toString().trim(),
    email: (fd.get('email') ?? '').toString().trim(),
    company: (fd.get('company') ?? '').toString().trim(),
    projectType: (fd.get('project_type') ?? '').toString().trim(),
    description: (fd.get('description') ?? '').toString().trim(),
    timeline: (fd.get('timeline') ?? '').toString().trim(),
    budget: (fd.get('budget') ?? '').toString().trim(),
    source: (fd.get('source') ?? '').toString().trim(),
    submittedAt: (fd.get('submitted_at') ?? '').toString().trim(),
  };

  if (!fields.name) return jsonResponse(400, { ok: false, error: 'Name is required.' });
  if (!isValidEmail(fields.email)) {
    return jsonResponse(400, { ok: false, error: 'Please enter a valid email.' });
  }
  if (!fields.projectType) {
    return jsonResponse(400, { ok: false, error: 'Please pick a project type.' });
  }
  if (!fields.description) {
    return jsonResponse(400, { ok: false, error: 'Please describe what you need.' });
  }
  if (!fields.timeline) {
    return jsonResponse(400, { ok: false, error: 'Please pick a timeline.' });
  }

  // Attachments — total cap of ~9MB to stay under Postmark's limit.
  const attachments: PostmarkAttachment[] = [];
  const fileSummaryParts: string[] = [];
  let totalBytes = 0;

  for (const entry of fd.getAll('attachments')) {
    if (!(entry instanceof File) || entry.size === 0) continue;
    if (totalBytes + entry.size > MAX_ATTACHMENT_BYTES) {
      return jsonResponse(413, {
        ok: false,
        error: 'Attachments are too large (combined limit ~9MB). Please send a link instead.',
      });
    }
    totalBytes += entry.size;
    const buf = await entry.arrayBuffer();
    attachments.push({
      Name: entry.name,
      Content: arrayBufferToBase64(buf),
      ContentType: entry.type || 'application/octet-stream',
    });
    fileSummaryParts.push(`${entry.name} (${Math.ceil(entry.size / 1024)} KB)`);
  }
  const fileSummary = fileSummaryParts.join(', ');

  const fromEmail = import.meta.env.POSTMARK_FROM_EMAIL;
  const intakeToEmail = import.meta.env.POSTMARK_INTAKE_TO_EMAIL;
  if (!fromEmail || !intakeToEmail) {
    return jsonResponse(500, { ok: false, error: 'Email service is not configured.' });
  }

  const result = await sendPostmarkEmail({
    From: fromEmail,
    To: intakeToEmail,
    ReplyTo: fields.email,
    Subject: `[Intake] ${fields.projectType} from ${fields.name}`,
    HtmlBody: buildIntakeHtml(fields, fileSummary),
    TextBody: buildIntakeText(fields, fileSummary),
    Tag: 'quick-project-intake',
    Attachments: attachments.length ? attachments : undefined,
  });

  if (!result.ok) {
    return jsonResponse(502, {
      ok: false,
      error: 'We couldn\'t send the intake right now. Please try again or email us directly.',
    });
  }

  return jsonResponse(200, { ok: true });
};
