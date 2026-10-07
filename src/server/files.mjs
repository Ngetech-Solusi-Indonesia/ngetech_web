import { resolve, join } from 'node:path';
import { openSync, writeFileSync, fsyncSync, closeSync, renameSync, mkdirSync, readFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
export const dataDir = () => resolve(process.env.DATA_DIR || join(process.cwd(), 'data'));
export function ensureDataDir() { mkdirSync(dataDir(), { recursive: true, mode: 0o700 }); }
export function atomicJson(path, value) {
  const temporary = `${path}.${randomUUID()}.tmp`;
  const fd = openSync(temporary, 'wx', 0o600);
  try { writeFileSync(fd, JSON.stringify(value, null, 2) + '\n'); fsyncSync(fd); } finally { closeSync(fd); }
  renameSync(temporary, path);
}
export function optionalJson(path) {
  try { return JSON.parse(readFileSync(path, 'utf8')); }
  catch (error) { if (error.code === 'ENOENT') return undefined; throw error; }
}
