import { productDocs, type Status } from './content';

export type { Status };
export interface Project {
  key: string;
  status: Status;
  screenshot: string;
}

// Edited in the CMS (src/content/products/), ordered by `order`.
export const projects: Project[] = productDocs.map((p) => ({ key: p.slug, status: p.status, screenshot: p.screenshot }));
