import { scryptSync, randomBytes, createHash, timingSafeEqual } from 'node:crypto';
import { join } from 'node:path';
import { dataDir, ensureDataDir, atomicJson, optionalJson } from './files.mjs';
const accountFile = () => join(dataDir(), 'admin.json');
const sessionFile = () => join(dataDir(), 'sessions.json');
const scryptOptions = { N: 131072, r: 8, p: 1, maxmem: 256 * 1024 * 1024 };
const hashToken = token => createHash('sha256').update(token).digest('hex');
export function accountConfigured() { return !!optionalJson(accountFile()); }
export function createAccount(username, password) {
  if (!/^[a-zA-Z0-9._@-]{3,80}$/.test(username)) throw new Error('Username harus 3–80 karakter: huruf, angka, titik, @, atau tanda hubung.');
  if (typeof password !== 'string' || password.length < 12 || password.length > 256) throw new Error('Password harus 12–256 karakter.');
  const salt = randomBytes(32).toString('hex');
  const passwordHash = scryptSync(password, salt, 64, scryptOptions).toString('hex');
  ensureDataDir();
  atomicJson(accountFile(), { username, salt, passwordHash, version: randomBytes(16).toString('hex') });
  atomicJson(sessionFile(), {}); // Password resets invalidate all prior sessions.
}
export function verifyPassword(username, password) {
  const account = optionalJson(accountFile());
  if (typeof password !== 'string' || password.length > 256) return false;
  const candidate = scryptSync(password, account?.salt || 'unconfigured-account', 64, scryptOptions);
  const expected = account ? Buffer.from(account.passwordHash, 'hex') : Buffer.alloc(64);
  return candidate.length === expected.length && timingSafeEqual(candidate, expected) && !!account && username === account.username;
}
export function createSession() {
  const account = optionalJson(accountFile());
  if (!account) throw new Error('Akun admin belum dibuat.');
  const now = Date.now();
  const sessions = optionalJson(sessionFile()) || {};
  for (const [key, value] of Object.entries(sessions)) if (value.expires <= now) delete sessions[key];
  while (Object.keys(sessions).length >= 32) delete sessions[Object.keys(sessions)[0]];
  const token = randomBytes(32).toString('hex');
  sessions[hashToken(token)] = { username: account.username, version: account.version, expires: now + 8 * 60 * 60 * 1000 };
  atomicJson(sessionFile(), sessions);
  return token;
}
export function sessionUser(token) {
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return undefined;
  const account = optionalJson(accountFile());
  const session = (optionalJson(sessionFile()) || {})[hashToken(token)];
  return session && account && session.expires > Date.now() && session.version === account.version && session.username === account.username ? session.username : undefined;
}
export function revokeSession(token) {
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return;
  const sessions = optionalJson(sessionFile()) || {};
  delete sessions[hashToken(token)];
  atomicJson(sessionFile(), sessions);
}
export function secureCookie() { return process.env.CMS_COOKIE_SECURE === 'true' || (process.env.CMS_COOKIE_SECURE !== 'false' && process.env.NODE_ENV === 'production'); }
const attempts = new Map();
export function loginThrottle(ip) {
  const now = Date.now();
  const value = attempts.get(ip);
  if (value && value.until > now && value.count >= 10) return Math.ceil((value.until - now) / 1000);
  if (value && value.until <= now) attempts.delete(ip);
  return 0;
}
export function loginFailed(ip) {
  if (attempts.size >= 5000 && !attempts.has(ip)) attempts.delete(attempts.keys().next().value);
  const value = attempts.get(ip) || { count: 0, until: Date.now() + 15 * 60 * 1000 };
  value.count++;
  attempts.set(ip, value);
}
export function loginSucceeded(ip) { attempts.delete(ip); }
