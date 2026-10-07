import type { APIRoute } from 'astro';
import { revokeSession } from '../../../server/auth.mjs';
export const POST: APIRoute = ({ cookies, redirect }) => {
  revokeSession(cookies.get('ngetech_session')?.value);
  cookies.delete('ngetech_session', { path: '/' });
  return redirect('/admin/login', 303);
};
