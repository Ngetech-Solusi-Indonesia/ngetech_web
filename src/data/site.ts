import { getSiteDoc } from './content';
export function getSite() {
  const doc = getSiteDoc();
  return { name: 'NgeTech Solusi Indonesia', shortName: 'NgeTech', url: process.env.PUBLIC_SITE_URL || 'https://ngetech.studio', waNumber: doc.waNumber, email: doc.email, legalName: doc.legalName || undefined, githubOrg: doc.githubOrg };
}
export function waLink(text: string): string { return `https://wa.me/${getSite().waNumber}?text=${encodeURIComponent(text)}`; }
