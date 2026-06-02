// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://ebmstring.pro",
  integrations: [
    react(),
    sitemap({
      // Páginas internas de geração (PDF / OG / artes IG) ficam fora do índice.
      filter: (page) => !/\/(catalogo-pdf|og-card|ig)\b/.test(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: "auto",
  },
});
