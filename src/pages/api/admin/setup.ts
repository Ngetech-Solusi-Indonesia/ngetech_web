import type { APIRoute } from 'astro';
import { boundedBody, isLocalSetup, json } from '../../../server/http';
import { accountConfigured, createAccount } from '../../../server/auth.mjs';
export const POST: APIRoute = async (context) => {
  if (!isLocalSetup(context) || accountConfigured()) return json({ error: 'Pembuatan akun awal tidak tersedia di alamat ini.' }, 403);
  try {
    const form = new URLSearchParams(new TextDecoder().decode(await boundedBody(context.request, 4096)));
    const password = form.get('password') || '';
    if (password !== form.get('confirm')) return context.redirect('/admin/login?error=confirm', 303);
    createAccount(form.get('username') || '', password);
    return context.redirect('/admin/login?created=1', 303);
  } catch { return context.redirect('/admin/login?error=setup', 303); }
};
