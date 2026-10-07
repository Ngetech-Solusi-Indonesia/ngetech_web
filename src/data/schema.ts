// JSON-LD for search engines. Only facts that are true today; fields that are
// still placeholders (TODO_) are left out rather than published.
import { site } from './site';
import { team } from './team';
import { t, pathFor, type Locale } from '../i18n';

const filled = (v: string) => (v && !v.startsWith('TODO_') ? v : undefined);

export function schemaFor(locale: Locale) {
  const d = t(locale);
  const url = new URL(pathFor(locale), site.url).href;
  const orgId = `${site.url}/#organization`;
  const phone = filled(site.waNumber);
  const email = filled(site.email);

  const org: Record<string, unknown> = {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': orgId,
    name: site.name,
    alternateName: site.shortName,
    ...(filled(site.legalName) ? { legalName: site.legalName } : {}),
    url: site.url,
    logo: `${site.url}/brand/ngetech-mark-192.png`,
    image: `${site.url}/og.png`,
    description: d.meta.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bandung',
      addressRegion: 'Jawa Barat',
      addressCountry: 'ID',
    },
    areaServed: [
      { '@type': 'City', name: 'Bandung' },
      { '@type': 'Country', name: 'Indonesia' },
    ],
    knowsLanguage: ['id', 'en'],
    sameAs: [`https://github.com/${site.githubOrg}`],
    ...(phone ? { telephone: `+${phone}` } : {}),
    ...(email ? { email } : {}),
    numberOfEmployees: { '@type': 'QuantitativeValue', value: team.length },
    employee: team.map((m) => ({
      '@type': 'Person',
      name: m.name,
      jobTitle: m.role[locale],
      ...(m.github ? { sameAs: [`https://github.com/${m.github}`] } : {}),
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: d.why.title,
      itemListElement: (['inventory', 'ngebooth', 'rfid'] as const).map((k) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          name: d.projects[k].name,
          description: d.projects[k].desc,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
        },
      })),
    },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      org,
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: ['id-ID', 'en-US'],
        publisher: { '@id': orgId },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: d.meta.title,
        description: d.meta.description,
        inLanguage: locale === 'id' ? 'id-ID' : 'en-US',
        isPartOf: { '@id': `${site.url}/#website` },
        about: { '@id': orgId },
        primaryImageOfPage: `${site.url}/og.png`,
      },
    ],
  };
}
