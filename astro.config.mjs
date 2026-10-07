// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'id', locales: { id: 'id-ID', en: 'en-US' } },
    }),
  ],
});
