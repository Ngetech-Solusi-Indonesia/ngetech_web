import type { APIRoute } from 'astro';
import { boundedBody, json } from '../../../server/http';
import { verifyPassword, createSession, secureCookie, loginThrottle, loginFailed, loginSucceeded } from '../../../server/auth.mjs';
export const POST: APIRoute = async ({ request, cookies, redirect, clientAddress }) => {
  const retry = loginThrottle(clientAddress);
  if (retry) return new Response('Terlalu banyak percobaan. Coba lagi dalam 15 menit.', { status: 429, headers: { 'Retry-After': String(retry), 'Cache-Control': 'no-store' } });
  try {
    const body = new URLSearchParams(new TextDecoder().decode(await boundedBody(request, 4096)));
    if (!verifyPassword(body.get('username') || '', body.get('password') || '')) { loginFailed(clientAddress); return redirect('/admin/login?error=invalid', 303); }
    loginSucceeded(clientAddress);
    cookies.set('ngetech_session', createSession(), { httpOnly: true, secure: secureCookie(), sameSite: 'strict', path: '/', maxAge: 8 * 60 * 60 });
    return redirect('/admin', 303);
  } catch { return json({ error: 'Permintaan login belum valid.' }, 400); }
};
