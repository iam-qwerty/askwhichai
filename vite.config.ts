// ============================================================
// AskWhichAI — Vite build configuration
// ============================================================
// This file tells Vite how to bundle the app for both
// development (local) and production (Cloudflare Workers).
// Plugins are loaded in order — each one transforms the code
// in a specific way before the final bundle is created.
// ============================================================

import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

// TanStack Start plugin — enables server functions (serverFn),
// SSR (server-side rendering), and the file-based router.
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'

const config = defineConfig({
  // Lets you use path aliases like @/ or #/ to point to src/
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),       // TanStack devtools panel (React Query + Router)
    cloudflare({ viteEnvironment: { name: 'ssr' } }),  // Deploy to Cloudflare Workers (SSR env)
    tailwindcss(),    // Tailwind CSS v4 — reads @import "tailwindcss" in styles.css
    tanstackStart(),  // TanStack Start — server functions, SSR, routing
    viteReact(),      // Standard React JSX transform
  ],
})

export default config
