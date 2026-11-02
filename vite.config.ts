import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { vitePrerenderPlugin } from "vite-prerender-plugin";
import ingredientList from "./scripts/ingredient-routes.json";

// All routes prerendered at build time.
// Root + section pages + 404 + 29 ingredient detail pages = 39 routes.
// (Note: /showcase is intentionally NOT in this list - internal review page,
//  no need to prerender; SPA fallback will serve it via index.html.)
const PRERENDER_ROUTES = [
  "/",
  "/the-how",
  "/ingredients",
  "/our-promise",
  "/preorder",
  "/privacy",
  "/terms",
  "/shipping",
  "/contact",
  // Rendered by the catch-all NotFound route; scripts/finalize-404.ts moves it
  // to dist/public/404.html, which Vercel serves with HTTP 404 for unknown URLs.
  "/404",
  ...ingredientList.map((i: { slug: string }) => `/ingredients/${i.slug}`),
];

// Preload the latin subsets of the self-hosted fonts (@fontsource-variable,
// imported in client/src/main.tsx) so headings render in the final face on
// first paint instead of swapping from a fallback. The swap moved the hero
// card and added layout shift once the hero stopped fading in from opacity 0.
// Uses the hashed asset names from the bundle so the preload and the
// @font-face src are the same URL (no double download).
function preloadFonts(match: RegExp): Plugin {
  return {
    name: "zt-preload-fonts",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(_html, ctx) {
        if (!ctx.bundle) return [];
        return Object.keys(ctx.bundle)
          .filter((f) => match.test(f))
          .map((f) => ({
            tag: "link",
            attrs: { rel: "preload", as: "font", type: "font/woff2", href: `/${f}`, crossorigin: "" },
            injectTo: "head-prepend" as const,
          }));
      },
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    preloadFonts(/(montserrat|playfair-display)-latin-wght-normal-[^/]*\.woff2$/),
    vitePrerenderPlugin({
      renderTarget: "#root",
      prerenderScript: path.resolve(import.meta.dirname, "client/src/prerender.tsx"),
      additionalPrerenderRoutes: PRERENDER_ROUTES,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "wouter"],
          "radix-ui": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-tabs",
            "@radix-ui/react-accordion",
            "@radix-ui/react-popover",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-select",
            "@radix-ui/react-toast",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-switch",
            "@radix-ui/react-label",
            "@radix-ui/react-slot",
          ],
          "framer": ["framer-motion"],
          "icons": ["lucide-react"],
          "query": ["@tanstack/react-query"],
        },
      },
    },
  },
});
