// ============================================================
// AskWhichAI — Tool detail page (/tool/$id) route
// ============================================================
// Shows full details for a single AI tool. The route parameter
// $id is a UUID that identifies which tool to display.
//
// If the tool doesn't exist (e.g. wrong ID), it throws a
// notFound() which triggers the 404 page from __root.tsx.
//
// Key features:
//   - Server-side loader fetches the tool by ID
//   - Dynamic page title (<title> tag) based on tool name
//   - Loading skeleton shown while the page is loading
// ============================================================

import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { fetchToolById } from '@/lib/tools.functions'
import { ToolDetails } from '@/components/tool-details'

export const Route = createFileRoute('/tool/$id')({
  // Fetch the tool on the server before rendering
  loader: async ({ params }) => {
    const tool = await fetchToolById({ data: { id: params.id } })
    if (!tool) {
      // If no tool found, show the 404 page
      throw notFound()
    }
    return { tool }
  },

  // Set the page title dynamically (e.g. "ChatGPT — AskWhichAI")
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [{ title: `${loaderData.tool.name} — AskWhichAI` }]
      : [{ title: 'Tool — AskWhichAI' }],
  }),

  component: ToolPage,

  // Skeleton shown while the loader is running (SSR streaming)
  pendingComponent: ToolPageLoading,
})

function ToolPage() {
  const { tool } = Route.useLoaderData()

  return (
    <div className="container mx-auto max-w-2xl py-10 px-4">
      {/* Back link — returns to the tool grid */}
      <Link
        to="/"
        search={{ query: undefined }}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        All tools
      </Link>

      <div className="bg-card border border-border/50 rounded-xl p-8 shadow-sm relative overflow-hidden animate-fade-in">
        <div className="absolute inset-0 texture-overlay opacity-20 pointer-events-none" />
        <div className="relative z-10">
          <ToolDetails tool={tool} />
        </div>
      </div>
    </div>
  )
}

// Loading skeleton — mirrors the final layout so nothing jumps on arrival
function ToolPageLoading() {
  return (
    <div className="container mx-auto max-w-2xl py-10 px-4">
      <div className="h-5 w-20 bg-muted rounded mb-6 animate-pulse" />   {/* Back link skeleton */}
      <div className="bg-card border border-border/50 rounded-xl p-8 shadow-sm animate-pulse">
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-3">
            <div className="h-9 bg-muted rounded w-2/3" />   {/* Title skeleton */}
            <div className="h-6 bg-muted rounded w-16" />    {/* Badge skeleton */}
          </div>
          <div className="space-y-2">
            <div className="h-5 bg-muted rounded w-full" />   {/* Description line 1 */}
            <div className="h-5 bg-muted rounded w-5/6" />    {/* Description line 2 */}
          </div>
          <div className="h-10 bg-muted rounded w-full" />    {/* CTA skeleton */}
        </div>
      </div>
    </div>
  )
}
