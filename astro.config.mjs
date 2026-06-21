// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Used to build absolute URLs for SEO / Open Graph tags + the sitemap.
  // Change this to your custom domain if you have one (e.g. "https://cristian.studio").
  // NOTE: if you change this, also update the Sitemap line in public/robots.txt.
  site: "https://isaac-doobs.github.io",
  // base: '/<your-repository-name>', // Uncomment + set if NOT hosting on root user pages
  integrations: [sitemap()],
});
