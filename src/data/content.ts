import type { ImageMetadata } from 'astro';
import { currentContent } from '../server/store';
export type { Bi, Status, ProductDoc, TeamDoc, SiteDoc } from '../server/schema';
export const getPageDoc = () => currentContent().page;
export const getSiteDoc = () => currentContent().site;
export const getProductDocs = () => [...currentContent().products].sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
export const getTeamDocs = () => [...currentContent().team].sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
const images = import.meta.glob<ImageMetadata>('/src/assets/products/**/*.{png,jpg,jpeg,webp,avif}', { eager: true, import: 'default' });
export function productImage(path: string): ImageMetadata {
  const image = images[path];
  if (!image) throw new Error(`Screenshot not found: ${path}`);
  return image;
}
export function localize(value: unknown, locale: 'id' | 'en'): unknown {
  if (Array.isArray(value)) return value.map(item => localize(item, locale));
  if (value && typeof value === 'object') {
    if ('id' in value && 'en' in value) return (value as Record<string, unknown>)[locale];
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localize(item, locale)]));
  }
  return value;
}
