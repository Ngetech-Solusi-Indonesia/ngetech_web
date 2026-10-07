import { siteDoc } from './content';

// Contact details are edited in the CMS (src/content/site.json).
export const site = {
  name: 'NgeTech Solusi Indonesia',
  shortName: 'NgeTech',
  url: 'https://ngetech.studio',
  waNumber: siteDoc.waNumber,
  email: siteDoc.email,
  // Not a registered PT/CV yet; empty until it is. The name stays "NgeTech Solusi Indonesia".
  legalName: siteDoc.legalName || undefined,
  githubOrg: siteDoc.githubOrg,
};

export function waLink(text: string): string {
  return `https://wa.me/${site.waNumber}?text=${encodeURIComponent(text)}`;
}
