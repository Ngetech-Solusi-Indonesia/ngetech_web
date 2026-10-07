import { defineMiddleware } from 'astro:middleware';
import { sessionUser } from './server/auth.mjs';
import { sameOrigin, json } from './server/http';
import { contentContext, readContent } from './server/store';
export const onRequest = defineMiddleware(async (context, next) => {
  const path = context.url.pathname;
  if (path === '/keystatic' || path.startsWith('/keystatic/')) return context.redirect('/admin', 302);
  const admin = path === '/admin' || path.startsWith('/admin/');
  const api = path.startsWith('/api/admin/');
  if (admin || api) {
    if (!['GET', 'HEAD'].includes(context.request.method) && !sameOrigin(context.request)) return json({ error: 'Permintaan harus berasal dari halaman admin ini.' }, 403);
    const publicRoute = ['/admin/login', '/api/admin/login', '/api/admin/setup'].includes(path);
    const username = sessionUser(context.cookies.get('ngetech_session')?.value);
    if (!publicRoute && !username) return api ? json({ error: 'Silakan login kembali.' }, 401) : context.redirect('/admin/login', 302);
    context.locals.admin = username;
    const response = await contentContext.run(readContent(), next);
    response.headers.set('Cache-Control', 'no-store');
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'same-origin');
    return response;
  }
  return contentContext.run(readContent(), next);
});
