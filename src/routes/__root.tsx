// ============================================================
// AskWhichAI — Root route (app shell / layout)
// ============================================================
// This is the root layout for every page in the app. It wraps
// all routes with:
//   - HTML document structure (<html>, <head>, <body>)
//   - Global providers (TooltipProvider)
//   - The header/navigation bar
//   - A toast notification system (Sonner Toaster)
//   - Dev tools panels (React Query + Router devtools)
//
// The shellComponent (RootDocument) is rendered around every
// page's content, so things like the header and toast system
// only need to be defined once here.
// ============================================================

import {
  HeadContent,
  Link,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Header from '../components/Header'
import { TooltipProvider } from '../components/ui/tooltip'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import { Toaster } from '../components/ui/sonner'

// Import the global CSS (Vite processes this and extracts it into the build)
import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

// ---- Router context type ----
// This interface defines what data the router context holds.
// The queryClient is created in router.tsx and passed down
// so all routes can use TanStack Query.
interface MyRouterContext {
  queryClient: QueryClient
}

// Create the root route with our custom context type
export const Route = createRootRouteWithContext<MyRouterContext>()({
  // ---- Page head / SEO metadata ----
  // These <meta> tags and <link> tags are injected into <head>
  // on every page. Individual routes can override/extend the title.
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'AskWhichAI' },
      { name: 'description', content: 'Find the best AI tool for specific tasks' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
    ],
  }),

  // ---- 404 page ----
  // Shown when a route doesn't match any file-based route.
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">404</h1>
        <p className="text-muted-foreground">This page doesn't exist — the tool may have been removed.</p>
        <Link
          to="/"
          search={{ query: undefined }}
          className="inline-block text-primary underline underline-offset-4 rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          Browse all tools
        </Link>
      </div>
    </div>
  ),

  // The shell component wraps every page
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Injects the meta/links from the route's head config */}
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        <TooltipProvider>
          {/* Navigation bar shown on all pages */}
          <Header />
          {/* Page-specific content goes here */}
          <main>{children}</main>
        </TooltipProvider>
        {/* Toast notification popups */}
        <Toaster />
        {/* Dev tools (only shown in dev mode) */}
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
