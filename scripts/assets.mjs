// Renders public/og.png from the hero. Favicons come from public/brand/ (the org logo).
// Needs a running preview: `pnpm build:preview && pnpm preview`, then `node scripts/assets.mjs`.
import { chromium } from '@playwright/test';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const executablePath = process.env.CHROMIUM_PATH || undefined;
const browser = await chromium.launch({ executablePath });

const og = await browser.newPage({ viewport: { width: 1200, height: 630 }, colorScheme: 'light' });
await og.goto(BASE + '/');
await og.addStyleTag({
  content: `.header .links,.header .end,.actions,.skip,.app figcaption{display:none!important}.header{position:static!important;border:0!important}.hero{padding-top:40px!important}
    .demo{margin-top:40px!important}*{animation:none!important}`,
});
await og.evaluate(() => document.fonts.ready);
await og.screenshot({ path: 'public/og.png' });


await browser.close();
console.log('Wrote public/og.png');
