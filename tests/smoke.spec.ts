import { test, expect, type Page } from '@playwright/test';

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  return errors;
}

for (const [path, lang, heading] of [
  ['/', 'id', 'Dari kertas dan Excel'],
  ['/en/', 'en', 'From paper and spreadsheets'],
] as const) {
  test(`${path} renders in ${lang}`, async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto(path);
    await expect(page.locator('html')).toHaveAttribute('lang', lang);
    await expect(page.locator('h1')).toContainText(heading);
    for (const id of ['demo', 'why', 'products', 'team', 'contact']) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
    expect(errors).toEqual([]);
  });
}

test('project status labels match reality', async ({ page }) => {
  await page.goto('/');
  const items = page.locator('#products .product');
  await expect(items).toHaveCount(3);
  await expect(items.nth(0)).toContainText('Sistem Inventaris');
  await expect(items.nth(0)).toContainText('Dipakai klien');
  await expect(items.nth(1)).toContainText('Uji coba internal');
  await expect(items.nth(2)).toContainText('Dalam pengembangan');
  // RFID names who it is for, never a site it runs at.
  await expect(items.nth(2)).not.toContainText(/dipasang di|dipakai di|terpasang|klien/i);
});

test('WhatsApp links use wa.me with a prefilled message', async ({ page }) => {
  await page.goto('/');
  const links = page.locator('a[href^="https://wa.me/"]');
  expect(await links.count()).toBeGreaterThanOrEqual(3);
  const href = (await links.first().getAttribute('href'))!;
  expect(href).toMatch(/^https:\/\/wa\.me\/[^?]+\?text=.+/);
});

test('language switch keeps the section hash', async ({ page }) => {
  await page.goto('/#team');
  await page.locator('.header [data-lang-link][hreflang="en"]').click();
  await expect(page).toHaveURL(/\/en\/#team$/);
});

test('inventory demo takes stock out and logs it', async ({ page }) => {
  await page.goto('/');
  const row = page.locator('[data-row="0"]');
  await expect(row.locator('[data-qty]')).toHaveText('42');
  await row.locator('[data-delta="-1"]').click();
  await row.locator('[data-delta="-1"]').click();
  await expect(row.locator('[data-qty]')).toHaveText('40');
  await expect(page.locator('[data-inv-log] li').first()).toContainText('Kertas A4 80 gsm');
  await expect(page.locator('[data-inv-log] li').first()).toContainText('2 rim');
});

test('inventory search filters and shows an empty state', async ({ page }) => {
  await page.goto('/');
  await page.fill('[data-inv-search]', 'lakban');
  await expect(page.locator('tr[data-row]:visible')).toHaveCount(1);
  await page.fill('[data-inv-search]', 'zzz');
  await expect(page.locator('[data-inv-empty]')).toBeVisible();
});

test('RFID tab: keyboard tab switch, tap adds attendance', async ({ page }) => {
  await page.goto('/');
  await page.locator('#tab-inventory').focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#tab-rfid')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#panel-rfid')).toBeVisible();
  await page.click('[data-tap]');
  await expect(page.locator('[data-count]')).toHaveText('4');
  await expect(page.locator('[data-roll] li').first()).toContainText('Rani Aulia');
});

test('NgeBooth session fills the strip (reduced motion runs instantly)', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto('/en/');
  await page.click('#tab-booth');
  await page.click('[data-booth-start]');
  await expect(page.locator('.strip-frame.is-filled')).toHaveCount(4);
  await expect(page.locator('[data-vf]')).toHaveText('Strip ready to print');
  await ctx.close();
});

test('SEO: JSON-LD, hreflang, OG and real team names', async ({ page }) => {
  await page.goto('/');
  const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!);
  const org = ld['@graph'][0];
  expect(org.address.addressLocality).toBe('Bandung');
  expect(org.employee.map((e: { name: string }) => e.name)).toContain('Daniandra Prayudisty');
  expect(JSON.stringify(ld)).not.toContain('TODO_');
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute('href', 'https://ngetech.studio/en/');
  await expect(page.locator('meta[property="og:image:alt"]')).toHaveCount(1);
  await expect(page.locator('#team')).toContainText('Ali Hizqil');
  await expect(page.locator('#products img')).toHaveCount(3);
});
