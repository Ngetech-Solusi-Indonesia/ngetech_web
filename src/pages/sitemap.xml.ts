import type { APIRoute } from 'astro';
import { getTeam, profilePath } from '../data/team';
import { getSite } from '../data/site';
export const GET: APIRoute = () => {
  const site = getSite();
  const paths = ['/', '/en/', ...getTeam().flatMap(member => [profilePath('id', member.slug), profilePath('en', member.slug)])];
  const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `<url><loc>${escape(new URL(path, site.url).href)}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=300' } });
};
