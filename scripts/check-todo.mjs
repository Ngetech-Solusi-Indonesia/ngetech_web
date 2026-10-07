// Blocks production builds while placeholder content remains,
// and warns about phrasing the spec rules out (§2).
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOTS = ['src/i18n', 'src/data', 'src/content'];
const BANNED = [
  'seamless', 'cutting-edge', 'cutting edge', 'empower', 'leverage', 'next-level',
  'revolutionize', 'revolusi', 'inovatif', 'innovative', 'world-class', 'game-changer',
];

const files = ROOTS.flatMap(function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
});

const todos = [];
const banned = [];
for (const file of files) {
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    const loc = `${file}:${i + 1}`;
    for (const m of line.matchAll(/TODO_[A-Z0-9_]+/g)) todos.push(`${loc}  ${m[0]}`);
    const lower = line.toLowerCase();
    for (const word of BANNED) if (lower.includes(word)) banned.push(`${loc}  "${word}"`);
  });
}

if (banned.length) {
  console.warn(`\n⚠  Banned phrasing found (spec §2):\n  ${banned.join('\n  ')}\n`);
}
if (todos.length) {
  console.error(`\n✖  ${todos.length} placeholder(s) left. Fill these before a production build:\n  ${todos.join('\n  ')}\n`);
  console.error('   Use `pnpm build:preview` to build with placeholders.\n');
  process.exit(1);
}
console.log('✔  Content check passed.');
