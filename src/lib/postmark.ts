// Minimal Postmark client — used by the form-handling API routes.
// Reads the server token from POSTMARK_SERVER_TOKEN at request time so the
// build doesn't depend on it (Vercel injects it at runtime).

export interface PostmarkAttachment {
  Name: string;
  Content: string; // base64
  ContentType: string;
}

export interface PostmarkEmail {
  From: string;
  To: string;
  ReplyTo?: string;
  Subject: string;
  HtmlBody?: string;
  TextBody?: string;
  Tag?: string;
  Attachments?: PostmarkAttachment[];
  MessageStream?: string;
}

export interface PostmarkResult {
  ok: boolean;
  status: number;
  body?: unknown;
  error?: string;
}

export async function sendPostmarkEmail(email: PostmarkEmail): Promise<PostmarkResult> {
  const token = import.meta.env.POSTMARK_SERVER_TOKEN;
  if (!token) {
    return { ok: false, status: 500, error: 'POSTMARK_SERVER_TOKEN not configured' };
  }

  const payload = {
    MessageStream: 'outbound',
    ...email,
  };

  try {
    const res = await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': token,
      },
      body: JSON.stringify(payload),
    });
    const body = await res.json().catch(() => null);
    return { ok: res.ok, status: res.status, body };
  } catch (err) {
    return { ok: false, status: 0, error: err instanceof Error ? err.message : 'fetch failed' };
  }
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
