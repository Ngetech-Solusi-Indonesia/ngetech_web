// Values marked TODO_ block `pnpm build` until filled in.
export const site = {
  name: 'NgeTech Solusi Indonesia',
  shortName: 'NgeTech',
  url: 'https://ngetech.studio',
  // International format without "+" or spaces, e.g. 6281234567890
  waNumber: 'TODO_WA_NUMBER',
  email: 'TODO_EMAIL',
  // Registered entity name as it should appear in the footer, e.g. "PT NgeTech Solusi Indonesia"
  legalName: 'TODO_LEGAL_NAME',
  githubOrg: 'TODO_GITHUB_ORG',
};

export function waLink(text: string): string {
  return `https://wa.me/${site.waNumber}?text=${encodeURIComponent(text)}`;
}
