import type { APIRoute } from 'astro';
import { sendPostmarkEmail, escapeHtml } from '../../lib/postmark';
import { SCHEDULING_URL } from '../../lib/site';

export const prerender = false;

function jsonResponse(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function buildUserEmailHtml(report: string): string {
  return `
<!doctype html>
<html><head><meta charset="utf-8"><title>Your GTM Readiness Assessment</title></head>
<body style="margin:0;padding:0;background:#fafaf7;font-family:-apple-system,Segoe UI,sans-serif;color:#210D10;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafaf7;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;border:1px solid rgba(33,13,16,.08);overflow:hidden;">
        <tr><td style="padding:32px 32px 8px;">
          <p style="margin:0;font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#FF8001;">PikeSquare</p>
          <h1 style="margin:8px 0 0;font-size:24px;line-height:1.25;color:#202971;">Your GTM Readiness Assessment</h1>
        </td></tr>
        <tr><td style="padding:16px 32px 8px;color:#594E86;font-size:15px;line-height:1.6;">
          <p style="margin:0;">Thanks for taking the assessment. Here's your snapshot — current state vs. 12-month target across the six GTM pillars.</p>
        </td></tr>
        <tr><td style="padding:16px 32px;">
          <pre style="margin:0;padding:20px;background:#fafaf7;border:1px solid rgba(33,13,16,.08);border-radius:8px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13px;line-height:1.6;color:#210D10;white-space:pre-wrap;">${escapeHtml(report)}</pre>
        </td></tr>
        <tr><td style="padding:16px 32px 32px;color:#594E86;font-size:15px;line-height:1.6;">
          <p style="margin:0 0 16px;"><strong style="color:#202971;">Want help building the plan?</strong> Our 4–6 week GTM Diagnostic turns this snapshot into a defensible 90-day operating plan — owners, milestones, and the cadence to ship it.</p>
          <p style="margin:0;">
            <a href="${SCHEDULING_URL}" style="display:inline-block;padding:12px 24px;background:#202971;color:#ffffff;text-decoration:none;border-radius:9999px;font-weight:600;font-size:15px;">Book a 30-min meeting</a>
          </p>
        </td></tr>
        <tr><td style="padding:24px 32px;border-top:1px solid rgba(33,13,16,.08);color:#938CB1;font-size:12px;">
          PikeSquare, LLC &middot; senior GTM operators for startups and scale-ups<br>
          <a href="https://pikesquare.co" style="color:#594E86;">pikesquare.co</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`.trim();
}

function buildUserEmailText(report: string): string {
  return `Your GTM Readiness Assessment
=============================

Thanks for taking the assessment. Here's your snapshot:

${report}

Want help building the plan? Our 4–6 week GTM Diagnostic turns this
into a defensible 90-day operating plan — owners, milestones, and the
cadence to ship it.

Book a 30-min meeting: ${SCHEDULING_URL}

—
PikeSquare, LLC · pikesquare.co`;
}

export const POST: APIRoute = async ({ request }) => {
  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return jsonResponse(400, { ok: false, error: 'Invalid form data' });
  }

  // Honeypot — silently succeed if a bot filled it.
  if ((fd.get('_gotcha') ?? '').toString().trim() !== '') {
    return jsonResponse(200, { ok: true });
  }

  const email = (fd.get('email') ?? '').toString().trim();
  const report = (fd.get('report') ?? '').toString().trim();
  const source = (fd.get('source') ?? '').toString().trim();
  const submittedAt = (fd.get('submitted_at') ?? '').toString().trim();

  if (!isValidEmail(email)) {
    return jsonResponse(400, { ok: false, error: 'Please enter a valid email.' });
  }
  if (!report || report.startsWith('(no report')) {
    return jsonResponse(400, {
      ok: false,
      error: 'Please complete the assessment first, then submit your email.',
    });
  }

  const fromEmail = import.meta.env.POSTMARK_FROM_EMAIL;
  const notifyEmail = import.meta.env.POSTMARK_NOTIFY_EMAIL;
  if (!fromEmail) {
    return jsonResponse(500, { ok: false, error: 'Email service is not configured.' });
  }

  const userStream = import.meta.env.POSTMARK_STREAM_ASSESSMENT_RESULTS || 'outbound';
  const notifyStream = import.meta.env.POSTMARK_STREAM_ASSESSMENT_NOTIFY || 'outbound';

  // 1) Email the user their report.
  const userResult = await sendPostmarkEmail({
    From: fromEmail,
    To: email,
    Subject: 'Your GTM Readiness Assessment results',
    HtmlBody: buildUserEmailHtml(report),
    TextBody: buildUserEmailText(report),
    Tag: 'gtm-assessment-results',
    MessageStream: userStream,
  });

  if (!userResult.ok) {
    return jsonResponse(502, {
      ok: false,
      error: 'We couldn\'t send the email. Please try again.',
    });
  }

  // 2) Notify Susan (best-effort — don't fail the user if this part errors).
  if (notifyEmail) {
    const notifyText = [
      'New GTM Readiness Assessment submission.',
      '',
      `From: ${email}`,
      source ? `Source: ${source}` : '',
      submittedAt ? `Submitted at: ${submittedAt}` : '',
      '',
      '--- Report ---',
      report,
    ]
      .filter(Boolean)
      .join('\n');

    await sendPostmarkEmail({
      From: fromEmail,
      To: notifyEmail,
      ReplyTo: email,
      Subject: `[Assessment] New submission from ${email}`,
      TextBody: notifyText,
      Tag: 'gtm-assessment-notify',
      MessageStream: notifyStream,
    });
  }

  return jsonResponse(200, { ok: true });
};
