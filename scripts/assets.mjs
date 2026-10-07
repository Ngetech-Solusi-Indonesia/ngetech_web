// Renders public/og.png (from the hero) and public/favicon-32.png.
// Needs a running preview: `pnpm build:preview && pnpm preview`, then `node scripts/assets.mjs`.
import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const executablePath = process.env.CHROMIUM_PATH || undefined;
const browser = await chromium.launch({ executablePath });

const og = await browser.newPage({ viewport: { width: 1200, height: 630 }, colorScheme: 'light' });
await og.goto(BASE + '/');
await og.addStyleTag({
  content: `.header,.demo,.actions,.skip{display:none!important}.hero{padding-top:88px!important}
    .og-brand{position:fixed;left:32px;bottom:40px;display:flex;gap:10px;align-items:center;
      font:700 22px var(--font-display);letter-spacing:-.02em}
    .og-brand span{font:400 14px var(--font-mono);color:var(--ink-3);letter-spacing:.02em}`,
});
await og.evaluate(() => {
  const el = document.createElement('div');
  el.className = 'og-brand';
  el.innerHTML = '<img src="/favicon.svg" width="28" height="28" alt="">Ngetech <span>ngetech.studio</span>';
  document.body.append(el);
});
await og.evaluate(() => document.fonts.ready);
await og.screenshot({ path: 'public/og.png' });

const svg = readFileSync('public/favicon.svg', 'utf8');
const fav = await browser.newPage({ viewport: { width: 32, height: 32 } });
await fav.setContent(`<body style="margin:0">${svg.replace('<svg ', '<svg width="32" height="32" ')}</body>`);
await fav.screenshot({ path: 'public/favicon-32.png', omitBackground: true });

await browser.close();
console.log('Wrote public/og.png and public/favicon-32.png');
