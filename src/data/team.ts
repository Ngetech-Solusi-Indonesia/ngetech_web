// Team members, edited in the CMS (src/content/team/). Work entries are
// summarised from each person's commits; keep them factual.
import type { Locale } from '../i18n';
import { getTeamDocs, type Bi } from './content';

export interface Member {
  slug: string;
  name: string;
  short: string;
  role: Bi;
  email: string;
  github?: string;
  whatsapp?: boolean;
  work: { product: string; summary: Bi }[];
}

export const getTeam = (): Member[] => getTeamDocs().map((m) => ({
  slug: m.slug,
  name: m.name,
  short: m.short,
  role: m.role,
  email: m.email,
  github: m.github || undefined,
  whatsapp: m.whatsapp,
  work: m.work.filter((w) => w.product).map((w) => ({ product: w.product!, summary: w.summary })),
}));

export function profilePath(locale: Locale, slug: string): string {
  return locale === 'id' ? `/tim/${slug}/` : `/en/team/${slug}/`;
}
