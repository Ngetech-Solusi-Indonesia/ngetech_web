export type Status = 'in_use' | 'internal_testing' | 'in_development';

export interface Project {
  key: 'inventory' | 'ngebooth' | 'rfid';
  status: Status;
  // Optional real screenshot (phase 2). Path under src/assets.
  image?: string;
}

// Ordered by how far along each one is.
export const projects: Project[] = [
  { key: 'inventory', status: 'in_use' },
  { key: 'ngebooth', status: 'internal_testing' },
  { key: 'rfid', status: 'in_development' },
];
