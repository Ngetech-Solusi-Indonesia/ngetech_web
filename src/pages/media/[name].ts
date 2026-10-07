import type { APIRoute } from 'astro';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { dataDir } from '../../server/store';
export const GET: APIRoute = async ({ params }) => {
  if (!params.name || !/^[a-f0-9-]{36}\.webp$/.test(params.name)) return new Response('Not found', { status: 404 });
  try { return new Response(await readFile(join(dataDir(), 'media', params.name)), { headers: { 'Content-Type': 'image/webp', 'Cache-Control': 'public, max-age=31536000, immutable', 'X-Content-Type-Options': 'nosniff' } }); }
  catch (error) { if ((error as NodeJS.ErrnoException).code === 'ENOENT') return new Response('Not found', { status: 404 }); throw error; }
};
