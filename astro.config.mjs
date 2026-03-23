// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://aljesolutions.com',
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/header') &&
        !page.includes('/footer') &&
        !page.includes('/contenido-principal'),
    }),
  ],
});
