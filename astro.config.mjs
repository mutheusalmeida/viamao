import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import viteSvgr from "vite-plugin-svgr";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind({
    applyBaseStyles: false
  })],
  vite: {
    plugins: [viteSvgr()]
  },
  output: "server",
  adapter: netlify()
});