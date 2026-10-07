import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
const siteUrl = new URL(process.env.PUBLIC_SITE_URL || 'https://ngetech.studio');
export default defineConfig({
  site: siteUrl.href,
  security: { allowedDomains: [{ hostname: siteUrl.hostname }, { hostname: '127.0.0.1', protocol: 'http' }, { hostname: 'localhost', protocol: 'http' }] },
  trailingSlash: 'ignore',
  output: 'server',
  adapter: node({ mode: 'standalone', bodySizeLimit: 12 * 1024 * 1024 }),
  build: { inlineStylesheets: 'always' },
  i18n: { defaultLocale: 'id', locales: ['id', 'en'], routing: { prefixDefaultLocale: false } },
});
