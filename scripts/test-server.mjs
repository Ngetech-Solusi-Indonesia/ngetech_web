import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
const directory = mkdtempSync(join(tmpdir(), 'ngetech-cms-test-'));
process.env.DATA_DIR = directory;
const { createAccount } = await import('../src/server/auth.mjs');
createAccount('test-admin', 'Cms-test-password-123!');
const server = spawn(process.execPath, ['dist/server/entry.mjs'], { stdio: 'inherit', env: { ...process.env, DATA_DIR: directory, HOST: '127.0.0.1', PORT: '4322', NODE_ENV: 'production', CMS_COOKIE_SECURE: 'false' } });
let closing = false;
function cleanup() { if (closing) return; closing = true; server.kill(); try { rmSync(directory, { recursive: true, force: true }); } catch {} }
process.on('SIGINT', () => { cleanup(); process.exit(0); });
process.on('SIGTERM', () => { cleanup(); process.exit(0); });
server.on('exit', code => { cleanup(); process.exit(code ?? 0); });
