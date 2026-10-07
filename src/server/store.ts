import { readFileSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { AsyncLocalStorage } from 'node:async_hooks';
import { dataDir, atomicJson } from './files.mjs';
import { contentSchema, type Content, type ProductDoc, type TeamDoc } from './schema';
import page from '../content/page.json';
import site from '../content/site.json';
const slugOf = (path: string) => path.split('/').pop()!.replace(/\.json$/, '');
const products = Object.entries(import.meta.glob<Omit<ProductDoc, 'slug'>>('/src/content/products/*.json', { eager: true, import: 'default' })).map(([path, item]) => ({ ...item, slug: slugOf(path) }));
const team = Object.entries(import.meta.glob<Omit<TeamDoc, 'slug'>>('/src/content/team/*.json', { eager: true, import: 'default' })).map(([path, item]) => ({ ...item, slug: slugOf(path) }));
const defaults = contentSchema.parse({ revision: 0, page, site, products, team });
export { dataDir };
export const contentContext = new AsyncLocalStorage<Content>();
export const currentContent = () => contentContext.getStore() ?? readContent();
let cached: Content | undefined;
let signature = '';
export function readContent(): Content {
  const path = join(dataDir(), 'content.json');
  try {
    const stat = statSync(path);
    const next = `${path}:${stat.mtimeMs}:${stat.ctimeMs}:${stat.size}`;
    if (next !== signature || !cached) { cached = contentSchema.parse(JSON.parse(readFileSync(path, 'utf8'))); signature = next; }
    return cached;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return defaults;
    throw error; // A corrupt store must never be silently overwritten by defaults.
  }
}
export class ConflictError extends Error {}
export function saveContent(value: Content, expectedRevision: number) {
  const current = readContent();
  if (current.revision !== expectedRevision) throw new ConflictError('Konten sudah diubah dari tab lain. Muat ulang sebelum menyimpan.');
  const validated = contentSchema.parse({ ...value, revision: current.revision + 1 });
  const dir = dataDir();
  mkdirSync(join(dir, 'history'), { recursive: true, mode: 0o700 });
  const history = join(dir, 'history', `${current.revision}.json`);
  if (!existsSync(history)) atomicJson(history, current);
  atomicJson(join(dir, 'content.json'), validated);
  cached = undefined;
  signature = '';
  return readContent();
}
