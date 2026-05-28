import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://pikesquare.co',
  // Default output is static — adapter enables on-demand serverless rendering
  // for routes that opt out of prerendering (the /api routes and Keystatic admin).
  adapter: vercel(),
  redirects: {
    '/admin': '/keystatic',
  },
  integrations: [react(), markdoc(), keystatic()],
  vite: {
    plugins: [tailwindcss()],
  },
});
