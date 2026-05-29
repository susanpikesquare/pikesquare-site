import { makeHandler } from '@keystatic/astro/api';
import config from '../../keystatic.config';

// Keystatic derives the GitHub OAuth callback URL from the request origin. On
// the Vercel serverless runtime the request URL arrives as `localhost`, so we
// rebuild it from the forwarded host/proto. Used to override the login and
// callback routes where redirect_uri must be correct and consistent.
const keystaticHandler = makeHandler({ config });

// TEMP diagnostic: log the GitHub token-exchange request redirect_uri + error
// response so we can see exactly why auth fails. Redacts secrets/tokens.
const realFetch = globalThis.fetch;
globalThis.fetch = (async (input: any, init?: any) => {
  const urlStr =
    typeof input === 'string' ? input : input instanceof URL ? input.href : input?.url ?? '';
  const isTokenExchange = urlStr.includes('login/oauth/access_token');
  const res = await realFetch(input, init);
  if (isTokenExchange) {
    try {
      const body = typeof init?.body === 'string' ? init.body : '';
      const redirectUri = new URLSearchParams(body).get('redirect_uri');
      const text = await res.clone().text();
      const parsed = new URLSearchParams(text);
      console.log(
        '[ks-debug] token-exchange redirect_uri=', redirectUri,
        '| github error=', parsed.get('error'),
        '| desc=', parsed.get('error_description'),
        '| has_token=', text.includes('access_token'),
      );
    } catch (e) {
      console.log('[ks-debug] token-exchange log failed', e);
    }
  }
  return res;
}) as typeof fetch;

export function handleKeystatic(context: any) {
  const url = new URL(context.request.url);
  const fwdHost = context.request.headers.get('x-forwarded-host');
  console.log('[ks-debug] route=', url.pathname, 'host=', url.host, 'fwdHost=', fwdHost);
  if (fwdHost && fwdHost !== url.host) {
    const fwdProto = context.request.headers.get('x-forwarded-proto') ?? 'https';
    const fixedUrl = `${fwdProto}://${fwdHost}${url.pathname}${url.search}`;
    return keystaticHandler({ ...context, request: new Request(fixedUrl, context.request) });
  }
  return keystaticHandler(context);
}
