// Reads the files that Keystatic edits (src/content/**). Everything here is
// resolved at build time; the CMS commits changes and the site rebuilds.
import type { ImageMetadata } from 'astro';

export type Bi = { id: string; en: string };
export type Status = 'in_use' | 'internal_testing' | 'in_development';

export interface ProductDoc {
  name: string;
  nameEn: string;
  order: number;
  status: Status;
  screenshot: string;
  alt: Bi;
  desc: Bi;
  for: Bi;
  points: Bi[];
}

export interface TeamDoc {
  name: string;
  short: string;
  order: number;
  role: Bi;
  email: string;
  github?: string;
  whatsapp?: boolean;
  work: { product: string | null; summary: Bi }[];
}

export interface SiteDoc {
  waNumber: string;
  email: string;
  legalName?: string;
  githubOrg: string;
}

const slugOf = (path: string) => path.split('/').pop()!.replace(/\.json$/, '');

function byOrder<T extends { order: number }>(files: Record<string, T>) {
  return Object.entries(files)
    .map(([path, doc]) => ({ slug: slugOf(path), ...doc }))
    .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}

export const productDocs = byOrder(
  import.meta.glob<ProductDoc>('/src/content/products/*.json', { eager: true, import: 'default' }),
);
export const teamDocs = byOrder(
  import.meta.glob<TeamDoc>('/src/content/team/*.json', { eager: true, import: 'default' }),
);
import site from '../content/site.json';
// Keystatic omits empty optional fields (e.g. legalName) when it saves.
export const siteDoc = site as SiteDoc & Partial<Pick<SiteDoc, 'legalName'>>;
export { default as pageDoc } from '../content/page.json';

// Screenshots uploaded through the CMS land in src/assets/products/ and are
// optimised by Astro at build time.
const images = import.meta.glob<ImageMetadata>('/src/assets/products/**/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
});
export function productImage(path: string): ImageMetadata {
  const img = images[path];
  if (!img) throw new Error(`Screenshot not found: ${path}`);
  return img;
}

// Turn {id, en} leaves into plain strings for one locale.
export function localize<T>(value: T, locale: 'id' | 'en'): unknown {
  if (Array.isArray(value)) return value.map((v) => localize(v, locale));
  if (value && typeof value === 'object') {
    const keys = Object.keys(value);
    if (keys.length === 2 && 'id' in value && 'en' in value) return (value as unknown as Bi)[locale];
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, localize(v, locale)]));
  }
  return value;
}
