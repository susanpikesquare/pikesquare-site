import { makeHandler } from '@keystatic/astro/api';
import config from '../../keystatic.config';

// Keystatic derives the GitHub OAuth callback URL from the request origin. On
// the Vercel serverless runtime the request URL can arrive as `localhost`,
// producing a wrong redirect_uri. Rebuild the URL from the forwarded host/proto
// headers so the callback points at the real domain. Used to override the two
// OAuth routes (login + callback) where the redirect_uri must be correct.
const keystaticHandler = makeHandler({ config });

export function handleKeystatic(context: any) {
  const url = new URL(context.request.url);
  const fwdHost = context.request.headers.get('x-forwarded-host');
  if (fwdHost && fwdHost !== url.host) {
    const fwdProto = context.request.headers.get('x-forwarded-proto') ?? 'https';
    const fixedUrl = `${fwdProto}://${fwdHost}${url.pathname}${url.search}`;
    return keystaticHandler({ ...context, request: new Request(fixedUrl, context.request) });
  }
  return keystaticHandler(context);
}
