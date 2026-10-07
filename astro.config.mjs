// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

// `astro dev` runs in Node so Keystatic can write content files locally;
// builds target Cloudflare Pages, where it commits to GitHub instead.
const isDev = process.argv.includes('dev');

export default defineConfig({
  site: 'https://ngetech.studio',
  trailingSlash: 'ignore',
  // The whole stylesheet is ~20KB; inlining saves a render-blocking request.
  build: { inlineStylesheets: 'always' },
  i18n: {
    defaultLocale: 'id',
    locales: ['id', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  // The site is static; only the CMS (/keystatic and its API) runs on demand.
  output: 'static',
  adapter: isDev ? undefined : cloudflare({ imageService: 'compile' }),
  integrations: [
    react(),
    keystatic(),
    sitemap({
      i18n: { defaultLocale: 'id', locales: { id: 'id-ID', en: 'en-US' } },
      filter: (page) => !page.includes('/404') && !page.includes('/keystatic'),
      lastmod: new Date(),
      changefreq: 'monthly',
    }),
  ],
});
