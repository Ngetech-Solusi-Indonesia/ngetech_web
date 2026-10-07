import id from './id.json';
import en from './en.json';

export const locales = ['id', 'en'] as const;
export type Locale = (typeof locales)[number];
export type Dict = typeof id;

const dicts: Record<Locale, Dict> = { id, en };

// Both locales must carry the same keys; fail the build otherwise.
function keyPaths(obj: unknown, prefix = ''): string[] {
  if (obj === null || typeof obj !== 'object') return [prefix];
  if (Array.isArray(obj)) return [`${prefix}[${obj.length}]`, ...obj.flatMap((v, i) => keyPaths(v, `${prefix}[${i}]`))];
  return Object.entries(obj).flatMap(([k, v]) => keyPaths(v, prefix ? `${prefix}.${k}` : k));
}
const idKeys = new Set(keyPaths(id));
const enKeys = new Set(keyPaths(en));
const missing = [
  ...[...idKeys].filter((k) => !enKeys.has(k)).map((k) => `en.json missing ${k}`),
  ...[...enKeys].filter((k) => !idKeys.has(k)).map((k) => `id.json missing ${k}`),
];
if (missing.length) throw new Error(`i18n key mismatch:\n  ${missing.join('\n  ')}`);

export function t(locale: Locale): Dict {
  return dicts[locale];
}

export function pathFor(locale: Locale): string {
  return locale === 'id' ? '/' : `/${locale}/`;
}

export const htmlLang: Record<Locale, string> = { id: 'id', en: 'en' };
