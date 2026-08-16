// ============================================================
// AskWhichAI — Home page (/) route
// ============================================================
// This is the main landing page. It shows a search bar and a
// grid of AI tool cards. When the user searches, it uses
// semantic search (AI-powered) to find the most relevant tools.
// Without a search query, it shows the latest 9 tools.
//
// Key concepts:
//   - validateSearch: parses the ?query= URL parameter
//   - loaderDeps: tells the loader to re-run when the query changes
//   - loader: fetches data on the server before rendering the page
// ============================================================

import { Link, createFileRoute } from '@tanstack/react-router'
import { SearchX } from 'lucide-react'
import SearchBar from '@/components/search-bar'
import { ToolCard } from '@/components/tool-card'
import { Button } from '@/components/ui/button'
import { fetchTools } from '@/lib/tools.functions'
import { semanticSearch } from '@/lib/ai/semantic-search.functions'
import type { AITool } from '@/lib/types'

export const Route = createFileRoute('/')({
  // Parse the ?query= URL parameter (optional)
  validateSearch: (search: Record<string, unknown>) => ({
    query: (search.query as string) || undefined,
  }),

  // Tell the loader to depend on the query parameter
  loaderDeps: ({ search }) => ({ query: search.query }),

  // Server-side loader: runs before the page renders
  // - If there's a search query → do semantic search
  // - Otherwise → fetch all tools (limited to 9)
  loader: async ({ deps: { query } }) => {
    let tools: AITool[]
    if (query) {
      tools = await semanticSearch({ data: { query: decodeURIComponent(query) } })
    } else {
      tools = await fetchTools()
    }
    return { tools: tools ?? [] }
  },

  component: HomePage,
})

function HomePage() {
  // Access the data that was loaded by the server-side loader
  const { tools } = Route.useLoaderData()
  const { query } = Route.useSearch()
  const activeQuery = query ? decodeURIComponent(query) : undefined

  return (
    <div className="min-h-screen">
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 texture-overlay opacity-20 pointer-events-none" />
        <div className="container mx-auto max-w-4xl relative z-10 animate-fade-in">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance animate-slide-up">
              Find the right AI tool for specific tasks
            </h2>
            <p
              className="text-lg md:text-xl text-muted-foreground mb-8 font-sans leading-relaxed animate-slide-up"
              style={{ animationDelay: '0.05s' }}
            >
              Describe what you want to do, and we'll match you with the right AI tools.
            </p>

            <SearchBar />
          </div>

          {/* Results context — tells the user what they're looking at */}
          {activeQuery && tools.length > 0 && (
            <p className="text-sm text-muted-foreground mb-4" role="status">
              {tools.length} {tools.length === 1 ? 'match' : 'matches'} for “{activeQuery}”
            </p>
          )}

          {/* Tool grid — each card has a staggered animation delay (capped) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {tools.map((tool, index) => (
              <div
                key={tool.id}
                className="animate-slide-up h-full"
                style={{ animationDelay: `${Math.min(index * 0.05, 0.3)}s` }}
              >
                <ToolCard tool={tool} />
              </div>
            ))}
            {tools.length === 0 && (
              <div className="col-span-full flex flex-col items-center text-center gap-3 py-16">
                <SearchX className="w-8 h-8 text-muted-foreground" aria-hidden="true" />
                {activeQuery ? (
                  <>
                    <p className="text-foreground font-medium">No matches for “{activeQuery}”</p>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Try describing the task differently — for example “summarize long PDFs” or “generate product photos”.
                    </p>
                    <Button variant="outline" size="sm" asChild className="mt-2">
                      <Link to="/" search={{ query: undefined }}>Browse all tools</Link>
                    </Button>
                  </>
                ) : (
                  <p className="text-muted-foreground">No tools in the directory yet. Check back soon.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
