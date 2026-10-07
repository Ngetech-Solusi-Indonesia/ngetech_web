export interface Member {
  name: string;
  role: { id: string; en: string };
  github?: string;
  linkedin?: string;
}

export const team: Member[] = [
  { name: 'Daniandra Prayudisty', role: { id: 'CEO', en: 'CEO' } },
  { name: 'Muhammad Farhan Al Hasan', role: { id: 'CTO', en: 'CTO' }, github: 'farhanlhsn' },
  { name: 'Ali Hizqil', role: { id: 'Desainer', en: 'Designer' } },
  { name: 'Athallah Zacky Maulana', role: { id: 'Developer', en: 'Developer' } },
  { name: 'Ulinnuha Ubay', role: { id: 'Developer', en: 'Developer' } },
];
