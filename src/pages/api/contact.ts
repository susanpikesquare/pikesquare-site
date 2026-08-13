import type { APIRoute } from 'astro';

export const prerender = false;

// Submissions are emailed to both of these addresses.
const RECIPIENTS = ['susan.m.mcgovern@gmail.com', 'steve@pikesquare.co'];
// Must be an address on a domain verified in Resend (see README > Forms).
const FROM = 'PikeSquare Website <noreply@pikesquare.co>';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let data: Record<string, unknown>;
  try {
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      data = await request.json();
    } else {
      const form = await request.formData();
      data = Object.fromEntries(form.entries());
    }
  } catch {
    return json({ ok: false, error: 'Could not read your submission.' }, 400);
  }

  const name = String(data.name ?? '').trim();
  const company = String(data.company ?? '').trim();
  const email = String(data.email ?? '').trim();
  const phone = String(data.phone ?? '').trim();
  const need = String(data.need ?? '').trim();
  const honeypot = String(data._gotcha ?? '').trim();

  // Honeypot field: real users never fill it, bots do — pretend success.
  if (honeypot) return json({ ok: true }, 200);

  if (!name || !email || !need) {
    return json(
      { ok: false, error: 'Please fill in your name, email, and what you need help with.' },
      400
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: 'Please enter a valid email address.' }, 400);
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set — cannot send the contact email.');
    return json(
      { ok: false, error: 'The form is not fully configured yet. Please email us directly.' },
      500
    );
  }

  const rows: [string, string][] = [
    ['Name', name],
    ['Company', company || '—'],
    ['Email', email],
    ['Phone', phone || '—'],
  ];
  const html = `
    <h2>New contact form submission</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="font-weight:bold;padding-right:12px">${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`
        )
        .join('')}
    </table>
    <h3>What they need help with</h3>
    <p style="white-space:pre-wrap">${escapeHtml(need)}</p>
  `;
  const text =
    `New contact form submission\n\n` +
    `Name: ${name}\n` +
    `Company: ${company || '—'}\n` +
    `Email: ${email}\n` +
    `Phone: ${phone || '—'}\n\n` +
    `What they need help with:\n${need}\n`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: RECIPIENTS,
        reply_to: email,
        subject: `New enquiry from ${name}${company ? ` (${company})` : ''}`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('Resend responded with an error:', res.status, detail);
      return json(
        { ok: false, error: 'Something went wrong sending your message. Please email us directly.' },
        502
      );
    }
  } catch (err) {
    console.error('Failed to send the contact email:', err);
    return json(
      { ok: false, error: 'Something went wrong sending your message. Please email us directly.' },
      502
    );
  }

  return json({ ok: true }, 200);
};
