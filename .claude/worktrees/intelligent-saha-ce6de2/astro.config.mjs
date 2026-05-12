import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://pikesquare.co',
  // Default output is static — adapter enables on-demand serverless rendering
  // for any route with `export const prerender = false` (just the /api routes).
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
});
