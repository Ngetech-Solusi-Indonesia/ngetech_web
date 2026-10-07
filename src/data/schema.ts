// JSON-LD for search engines. Only facts that are true today; fields that are
// still placeholders (TODO_) are left out rather than published.
import { site } from './site';
import { team, profilePath, type Member } from './team';
import { projects } from './projects';
import { t, pathFor, type Locale } from '../i18n';

const filled = (v?: string) => (v && !v.startsWith('TODO_') ? v : undefined);

const personId = (m: Member) => `${site.url}/tim/${m.slug}/#person`;

function person(locale: Locale, m: Member) {
  return {
    '@type': 'Person',
    '@id': personId(m),
    name: m.name,
    jobTitle: m.role[locale],
    email: m.email,
    url: new URL(profilePath(locale, m.slug), site.url).href,
    worksFor: { '@id': `${site.url}/#organization` },
    ...(m.github ? { sameAs: [`https://github.com/${m.github}`] } : {}),
  };
}

export function personSchema(locale: Locale, m: Member) {
  const url = new URL(profilePath(locale, m.slug), site.url).href;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${url}#webpage`,
        url,
        name: `${m.name}, ${m.role[locale]}`,
        inLanguage: locale === 'id' ? 'id-ID' : 'en-US',
        mainEntity: { '@id': personId(m) },
        isPartOf: { '@id': `${site.url}/#website` },
      },
      person(locale, m),
      { '@type': 'Organization', '@id': `${site.url}/#organization`, name: site.name, url: site.url },
    ],
  };
}

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
    ...(phone || email
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            ...(phone ? { telephone: `+${phone}` } : {}),
            ...(email ? { email } : {}),
            availableLanguage: ['Indonesian', 'English'],
            areaServed: 'ID',
          },
        }
      : {}),
    employee: team.map((m) => ({ '@id': personId(m) })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: d.why.title,
      itemListElement: projects.map(({ key: k }) => ({
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
      ...team.map((m) => person(locale, m)),
    ],
  };
}
