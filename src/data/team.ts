export interface Member {
  name: string;
  role: { id: string; en: string };
  github?: string;
  linkedin?: string;
}

export const team: Member[] = [
  { name: 'TODO_TEAM_1_NAME', role: { id: 'TODO_TEAM_1_ROLE', en: 'TODO_TEAM_1_ROLE' } },
  { name: 'TODO_TEAM_2_NAME', role: { id: 'TODO_TEAM_2_ROLE', en: 'TODO_TEAM_2_ROLE' } },
  { name: 'TODO_TEAM_3_NAME', role: { id: 'TODO_TEAM_3_ROLE', en: 'TODO_TEAM_3_ROLE' } },
  { name: 'TODO_TEAM_4_NAME', role: { id: 'TODO_TEAM_4_ROLE', en: 'TODO_TEAM_4_ROLE' } },
  { name: 'TODO_TEAM_5_NAME', role: { id: 'TODO_TEAM_5_ROLE', en: 'TODO_TEAM_5_ROLE' } },
];

export function initials(name: string): string {
  if (name.startsWith('TODO_')) return '··';
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
}
