import type { APIRoute } from 'astro';
import { getSite } from '../data/site';
export const GET: APIRoute = () => new Response(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nDisallow: /keystatic\nSitemap: ${new URL('/sitemap.xml', getSite().url).href}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
