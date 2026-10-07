import id from './id.json';
import en from './en.json';
import { pageDoc, productDocs, localize } from '../data/content';

export const locales = ['id', 'en'] as const;
export type Locale = (typeof locales)[number];

// Interface strings live here; page text, products and team come from the CMS.
type Ui = typeof id;
type Page = {
  meta: { title: string; description: string; ogAlt: string };
  hero: { title: string; sub: string; cta: string; secondary: string; demoNote: string };
  why: {
    title: string;
    items: { title: string; body: string }[];
    hw: string[];
    siteSteps: string[];
    before: string;
    beforeItems: string[];
    after: string;
    afterItem: string;
  };
  projects: { title: string; sub: string; shotNote: string; colFor: string };
  team: { title: string; sub: string };
  contact: {
    title: string; body: string; cta: string; waText: string; waWho: string;
    orEmail: string; emailWho: string; location: string;
  };
};
type ProductText = { name: string; desc: string; for: string; points: string[]; alt: string };
export type Dict = Omit<Ui, 'meta' | 'team'> &
  Omit<Page, 'meta' | 'team' | 'projects'> & {
    meta: Ui['meta'] & Page['meta'];
    team: Ui['team'] & Page['team'];
    projects: Page['projects'] & Record<string, ProductText>;
  };

// Both UI locales must carry the same keys; fail the build otherwise.
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

function build(locale: Locale): Dict {
  const ui = locale === 'id' ? id : en;
  const page = localize(pageDoc, locale) as Page;
  const products = Object.fromEntries(
    productDocs.map((p) => [
      p.slug,
      {
        name: locale === 'id' ? p.name : p.nameEn || p.name,
        ...(localize({ desc: p.desc, for: p.for, points: p.points, alt: p.alt }, locale) as Omit<ProductText, 'name'>),
      },
    ]),
  );
  return {
    ...ui,
    ...page,
    meta: { ...ui.meta, ...page.meta },
    team: { ...ui.team, ...page.team },
    projects: { ...page.projects, ...products },
  } as Dict;
}

const dicts: Record<Locale, Dict> = { id: build('id'), en: build('en') };

export function t(locale: Locale): Dict {
  return dicts[locale];
}

export function pathFor(locale: Locale): string {
  return locale === 'id' ? '/' : `/${locale}/`;
}

export const htmlLang: Record<Locale, string> = { id: 'id', en: 'en' };
