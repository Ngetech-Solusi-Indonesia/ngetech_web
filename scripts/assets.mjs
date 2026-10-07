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
  content: `.header,.actions,.skip,.app figcaption{display:none!important}.hero{padding-top:64px!important}
    .demo{margin-top:40px!important}*{animation:none!important}`,
});
await og.evaluate(() => document.fonts.ready);
await og.screenshot({ path: 'public/og.png' });

const svg = readFileSync('public/favicon.svg', 'utf8');
const fav = await browser.newPage({ viewport: { width: 32, height: 32 } });
await fav.setContent(`<body style="margin:0">${svg.replace('<svg ', '<svg width="32" height="32" ')}</body>`);
await fav.screenshot({ path: 'public/favicon-32.png', omitBackground: true });

await browser.close();
console.log('Wrote public/og.png and public/favicon-32.png');
