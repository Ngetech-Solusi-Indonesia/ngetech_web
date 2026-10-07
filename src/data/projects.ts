export type Status = 'in_use' | 'internal_testing' | 'in_development';

export interface Project {
  key: 'inventory' | 'ngebooth' | 'rfid';
  status: Status;
  // Real screenshot (sample data), in public/work/ as -800/-1600.webp
  shot: string;
}

// Ordered by how far along each one is.
export const projects: Project[] = [
  { key: 'inventory', status: 'in_use', shot: '/work/inventory-sales' },
  { key: 'ngebooth', status: 'internal_testing', shot: '/work/ngebooth-dashboard' },
  { key: 'rfid', status: 'in_development', shot: '/work/rfid-login' },
];
