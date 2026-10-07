import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { once } from 'node:events';
import sharp from 'sharp';
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
test('VPS server preserves content, media and login across restart; HTTPS proxy login works', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'ngetech-restart-test-'));
  const previousDir = process.env.DATA_DIR;
  process.env.DATA_DIR = dir;
  const { createAccount } = await import('../src/server/auth.mjs');
  createAccount('restart-test', 'Restart-test-password-123!');
  const base = 'http://127.0.0.1:4326';
  let child;
  async function start() {
    child = spawn(process.execPath, ['dist/server/entry.mjs'], { stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, DATA_DIR: dir, HOST: '127.0.0.1', PORT: '4326', NODE_ENV: 'production', CMS_COOKIE_SECURE: 'true' } });
    let errors = ''; child.stderr.on('data', chunk => errors += chunk); child.stdout.resume();
    for (let attempt = 0; attempt < 100; attempt++) { try { if ((await fetch(base + '/health')).ok) return; } catch {} if (child.exitCode !== null) throw new Error(errors || 'Server exited.'); await pause(100); }
    throw new Error('Server did not start: ' + errors);
  }
  async function stop() { if (!child || child.exitCode !== null) return; const exit = once(child, 'exit'); child.kill(); await exit; }
  try {
    await start();
    const body = new URLSearchParams({ username: 'restart-test', password: 'Restart-test-password-123!' });
    const login = await fetch(base + '/api/admin/login', { method: 'POST', headers: { Origin: base, 'Content-Type': 'application/x-www-form-urlencoded' }, body, redirect: 'manual' });
    assert.equal(login.status, 303);
    assert.match(login.headers.get('set-cookie'), /Secure/);
    const cookie = login.headers.get('set-cookie').split(';')[0];
    const headers = { Cookie: cookie, Origin: base, 'Content-Type': 'application/json' };
    const before = await (await fetch(base + '/api/admin/content', { headers })).json();
    const saved = await fetch(base + '/api/admin/content', { method: 'POST', headers, body: JSON.stringify({ section: 'site', revision: before.revision, data: { ...before.site, email: 'persisted@example.invalid' } }) });
    assert.equal(saved.status, 200);
    const image = await sharp({ create: { width: 8, height: 8, channels: 3, background: '#0c7686' } }).png().toBuffer();
    const form = new FormData(); form.set('image', new Blob([image], { type: 'image/png' }), 'sample.png');
    const upload = await fetch(base + '/api/admin/upload', { method: 'POST', headers: { Cookie: cookie, Origin: base }, body: form });
    assert.equal(upload.status, 200); const { url } = await upload.json();
    await stop(); await start();
    const persisted = await fetch(base + '/api/admin/content', { headers }); assert.equal(persisted.status, 200);
    assert.equal((await persisted.json()).site.email, 'persisted@example.invalid');
    assert.match(await (await fetch(base + '/')).text(), /persisted@example.invalid/);
    assert.equal((await fetch(base + url)).status, 200);
    const proxyHeaders = { Host: 'ngetech.studio', Origin: 'https://ngetech.studio', 'X-Forwarded-Host': 'ngetech.studio', 'X-Forwarded-Proto': 'https', 'Sec-Fetch-Site': 'same-origin', 'Content-Type': 'application/x-www-form-urlencoded' };
    const proxyLogin = await fetch(base + '/api/admin/login', { method: 'POST', headers: proxyHeaders, body, redirect: 'manual' });
    assert.equal(proxyLogin.status, 303); assert.equal(proxyLogin.headers.get('location'), '/admin');
    const forbidden = await fetch(base + '/api/admin/login', { method: 'POST', headers: { ...proxyHeaders, Origin: 'https://other.example' }, body, redirect: 'manual' }); assert.equal(forbidden.status, 403);
  } finally { await stop(); if (previousDir === undefined) delete process.env.DATA_DIR; else process.env.DATA_DIR = previousDir; rmSync(dir, { recursive: true, force: true }); }
});
