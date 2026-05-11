import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { vitePrerenderPlugin } from "vite-prerender-plugin";
import ingredientList from "./scripts/ingredient-routes.json";

// All routes prerendered at build time.
// Root + section pages + 35 ingredient detail pages = 40 routes.
// (Note: /showcase is intentionally NOT in this list — internal review page,
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
  ...ingredientList.map((i: { slug: string }) => `/ingredients/${i.slug}`),
];

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    vitePrerenderPlugin({
      renderTarget: "#root",
      prerenderScript: path.resolve(import.meta.dirname, "client/src/prerender.tsx"),
      additionalPrerenderRoutes: PRERENDER_ROUTES,
    }),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
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
          "icons": ["lucide-react", "react-icons"],
          "forms": ["react-hook-form", "@hookform/resolvers", "zod", "zod-validation-error"],
          "query": ["@tanstack/react-query"],
        },
      },
    },
  },
});
