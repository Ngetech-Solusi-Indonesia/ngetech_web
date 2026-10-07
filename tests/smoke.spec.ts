import { test, expect, type Page } from '@playwright/test';

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  return errors;
}

for (const [path, lang, heading] of [
  ['/', 'id', 'Kami bikin software'],
  ['/en/', 'en', 'We build software'],
] as const) {
  test(`${path} renders in ${lang}`, async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto(path);
    await expect(page.locator('html')).toHaveAttribute('lang', lang);
    await expect(page.locator('h1')).toContainText(heading);
    for (const id of ['projects', 'services', 'team', 'contact']) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
    expect(errors).toEqual([]);
  });
}

test('project status labels match reality', async ({ page }) => {
  await page.goto('/');
  const items = page.locator('#projects .item');
  await expect(items).toHaveCount(3);
  await expect(items.nth(0)).toContainText('Sistem Inventaris');
  await expect(items.nth(0)).toContainText('Dipakai klien');
  await expect(items.nth(1)).toContainText('Uji coba internal');
  await expect(items.nth(2)).toContainText('Dalam pengembangan');
  await expect(items.nth(2)).not.toContainText(/sekolah|SMP|SMA/i);
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

test('reduced motion shows the final demo frame and does not animate', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto('/');
  const rfid = page.locator('[data-panel="rfid"]');
  await expect(rfid).toHaveAttribute('data-on', 'card read row');
  await page.waitForTimeout(1500);
  await expect(rfid).toHaveAttribute('data-on', 'card read row');
  await ctx.close();
});

test('demo panels advance together', async ({ page }) => {
  await page.goto('/');
  // Within one 6s loop every panel reaches its last step.
  await expect(page.locator('[data-panel="rfid"]')).toHaveAttribute('data-on', /row/, { timeout: 7000 });
  await expect(page.locator('[data-panel="inventory"]')).toHaveAttribute('data-on', /log/, { timeout: 7000 });
  await expect(page.locator('[data-panel="booth"]')).toHaveAttribute('data-on', /done/, { timeout: 7000 });
});
