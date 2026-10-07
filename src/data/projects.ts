import { getProductDocs, type Status } from './content';

export type { Status };
export interface Project {
  key: string;
  status: Status;
  screenshot: string;
}

// Edited in the CMS (src/content/products/), ordered by `order`.
export const getProjects = (): Project[] => getProductDocs().map((p) => ({ key: p.slug, status: p.status, screenshot: p.screenshot }));
