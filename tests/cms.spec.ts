import { test, expect, type APIRequestContext } from '@playwright/test';
import sharp from 'sharp';
const origin = 'http://127.0.0.1:4322';
const headers = { Origin: origin };
async function login(request: APIRequestContext) { const response = await request.post('/api/admin/login', { form: { username: 'test-admin', password: 'Cms-test-password-123!' }, headers }); expect(response.ok()).toBe(true); }
async function state(request: APIRequestContext) { const response = await request.get('/api/admin/content'); expect(response.ok()).toBe(true); return response.json(); }
async function save(request: APIRequestContext, section: string, data: unknown, revision: number, slug?: string, action = 'save') { return request.post('/api/admin/content', { headers, data: { section, data, revision, slug, action } }); }

test('admin requires local login and legacy CMS route redirects', async ({ page, request }) => {
  await page.goto('/admin');
  await expect(page).toHaveURL(/\/admin\/login$/);
  await expect(page.getByRole('heading', { name: 'Masuk ke admin.' })).toBeVisible();
  expect((await request.get('/api/admin/content')).status()).toBe(401);
  expect((await request.post('/api/admin/content', { headers, data: {} })).status()).toBe(401);
  const legacy = await request.get('/keystatic', { maxRedirects: 0 });
  expect(legacy.status()).toBe(302); expect(legacy.headers().location).toBe('/admin');
  expect((await request.post('/api/admin/setup', { headers, form: { username: 'attacker', password: 'not-a-real-account-pass', confirm: 'not-a-real-account-pass' } })).status()).toBe(403);
});

test('login form opens the editor with no external authentication', async ({ page }) => {
  await page.goto('/admin/login');
  await page.getByLabel('Username', { exact: true }).fill('test-admin');
  await page.getByLabel('Password', { exact: true }).fill('Cms-test-password-123!');
  await page.getByRole('button', { name: 'Masuk', exact: true }).click();
  await expect(page).toHaveURL(/\/admin$/);
  await expect(page.getByRole('heading', { name: 'Halaman utama', exact: true })).toBeVisible();
  await expect(page.getByTestId('hero.title.id')).toHaveValue('Dari kertas dan Excel ke sistem yang rapi.');
  const cookie = (await page.context().cookies()).find(item => item.name === 'ngetech_session')!;
  expect(cookie.httpOnly).toBe(true); expect(cookie.sameSite).toBe('Strict');
});

test('saving the editor changes the public website without rebuild', async ({ page }) => {
  await login(page.request);
  const before = await state(page.request);
  try {
    await page.goto('/admin');
    await page.getByTestId('hero.title.id').fill('Konten uji dari CMS lokal.');
    await page.getByRole('button', { name: 'Simpan perubahan', exact: true }).click();
    await expect(page.locator('[data-status]')).toContainText('Perubahan tersimpan');
    await page.goto('/');
    await expect(page.locator('h1')).toHaveText('Konten uji dari CMS lokal.');
    await page.goto('/admin');
    await expect(page.getByTestId('hero.title.id')).toHaveValue('Konten uji dari CMS lokal.');
  } finally { const current = await state(page.request); expect((await save(page.request, 'page', before.page, current.revision)).ok()).toBe(true); }
});

test('stale edits and invalid content cannot overwrite valid content', async ({ request }) => {
  await login(request);
  const before = await state(request);
  const response = await save(request, 'site', before.site, before.revision);
  expect(response.ok()).toBe(true);
  expect((await save(request, 'site', { ...before.site, email: 'old-tab@example.invalid' }, before.revision)).status()).toBe(409);
  const current = await state(request);
  expect((await save(request, 'site', { ...current.site, waNumber: '../secret' }, current.revision)).status()).toBe(400);
  expect((await state(request)).site.waNumber).toBe(before.site.waNumber);
  expect((await request.post('/api/admin/content', { headers: { Origin: 'https://other.example' }, data: { section: 'site', revision: current.revision, data: current.site } })).status()).toBe(403);
});

test('new team members have live ID and EN routes and can be removed', async ({ request }) => {
  await login(request);
  const before = await state(request);
  const member = { slug: 'cms-test-member', name: 'CMS Test Member', short: 'Test', order: 99, role: { id: 'Penguji', en: 'Tester' }, email: 'test@example.invalid', github: '', whatsapp: false, work: [] };
  expect((await save(request, 'team', member, before.revision, undefined, 'create')).ok()).toBe(true);
  try {
    expect((await request.get('/tim/cms-test-member/')).status()).toBe(200);
    expect((await request.get('/en/team/cms-test-member/')).status()).toBe(200);
    expect(await (await request.get('/sitemap.xml')).text()).toContain('/tim/cms-test-member/');
  } finally { const current = await state(request); expect((await save(request, 'team', undefined, current.revision, member.slug, 'delete')).ok()).toBe(true); }
  expect((await request.get('/tim/cms-test-member/')).status()).toBe(404);
});

test('raster upload is served persistently and invalid images are rejected', async ({ request }) => {
  await login(request);
  const image = await sharp({ create: { width: 32, height: 20, channels: 3, background: '#0C7686' } }).png().toBuffer();
  const response = await request.post('/api/admin/upload', { headers, multipart: { image: { name: 'sample.png', mimeType: 'image/png', buffer: image } } });
  expect(response.ok()).toBe(true);
  const uploaded = await response.json();
  const media = await request.get(uploaded.url);
  expect(media.status()).toBe(200); expect(media.headers()['content-type']).toBe('image/webp'); expect(media.headers()['x-content-type-options']).toBe('nosniff');
  const before = await state(request);
  const product = before.products.find((item: { slug: string }) => item.slug === 'inventory');
  try {
    expect((await save(request, 'products', { ...product, screenshot: uploaded.url }, before.revision, product.slug)).ok()).toBe(true);
    expect(await (await request.get('/')).text()).toContain(uploaded.url);
  } finally { const current = await state(request); expect((await save(request, 'products', product, current.revision, product.slug)).ok()).toBe(true); }
  const invalid = await request.post('/api/admin/upload', { headers, multipart: { image: { name: 'image.svg', mimeType: 'image/svg+xml', buffer: Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>') } } });
  expect(invalid.status()).toBe(400);
  expect((await request.get('/media/../../admin.json')).status()).toBe(404);
});

test('logout revokes the server session and data files are not public', async ({ page }) => {
  await login(page.request);
  const token = (await page.context().cookies()).find(item => item.name === 'ngetech_session')!.value;
  await page.request.post('/api/admin/logout', { headers });
  expect((await page.request.get('/api/admin/content', { headers: { Cookie: `ngetech_session=${token}` } })).status()).toBe(401);
  expect((await page.request.get('/data/admin.json')).status()).toBe(404);
  expect((await page.request.get('/data/sessions.json')).status()).toBe(404);
});

test('linked products cannot be deleted and forged image paths cannot be saved', async ({ request }) => {
  await login(request);
  const current = await state(request);
  const product = current.products.find((item: { slug: string }) => item.slug === 'inventory');
  expect((await save(request, 'products', undefined, current.revision, product.slug, 'delete')).status()).toBe(400);
  expect((await save(request, 'products', { ...product, screenshot: '/src/assets/products/missing.webp' }, current.revision, product.slug)).status()).toBe(400);
  expect((await state(request)).revision).toBe(current.revision);
});
