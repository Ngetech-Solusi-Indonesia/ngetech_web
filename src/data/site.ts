// Values marked TODO_ block `pnpm build` until filled in.
export const site = {
  name: 'NgeTech Solusi Indonesia',
  shortName: 'NgeTech',
  url: 'https://ngetech.studio',
  // International format without "+" or spaces, e.g. 6281234567890
  waNumber: '6282188974105', // Dani (CEO)
  email: 'farhanlhsn@ngetech.studio', // Farhan (CTO) handles email enquiries
  // Not a registered PT/CV yet. Fill in when registered; the name stays "NgeTech Solusi Indonesia".
  legalName: undefined as string | undefined,
  githubOrg: 'Ngetech-Solusi-Indonesia',
};

export function waLink(text: string): string {
  return `https://wa.me/${site.waNumber}?text=${encodeURIComponent(text)}`;
}
