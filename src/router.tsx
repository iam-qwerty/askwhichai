// ============================================================
// AskWhichAI — Router setup (TanStack Router)
// ============================================================
// Creates the app router with file-based routing (from
// src/routes/) and SSR integration. The QueryClient is
// shared between the router and TanStack Query devtools.
//
// Key features:
//   - Scroll restoration: preserves scroll position on back nav
//   - Preloading: prefetches route data on link hover/intent
//   - SSR query integration: hydrates query cache on the server
// ============================================================

import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

import { QueryClient } from '@tanstack/react-query'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'

// Create a fresh QueryClient per request (prevents cross-request cache contamination)
export function getContext() {
  const queryClient = new QueryClient()
  return { queryClient }
}

export function getRouter() {
  const context = getContext()

  const router = createTanStackRouter({
    routeTree,                              // Auto-generated from src/routes/ files
    context,                                // Router context with queryClient
    scrollRestoration: true,                // Restore scroll on back/forward nav
    defaultPreload: 'intent',               // Preload routes when user hovers a link
    defaultPreloadStaleTime: 0,             // Always refetch on preload
  })

  // Link Router and TanStack Query for SSR — hydrates query data
  // from the server so the client doesn't refetch on first render
  setupRouterSsrQueryIntegration({ router, queryClient: context.queryClient })

  return router
}

// Type registration so useRouter() etc. know the router's shape
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
