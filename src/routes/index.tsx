import { createFileRoute } from '@tanstack/react-router'
import SearchBar from '@/components/search-bar'
import { ToolCard } from '@/components/tool-card'
import { fetchTools } from '@/lib/tools.functions'
import { semanticSearch } from '@/lib/ai/semantic-search.functions'
import type { AITool } from '@/lib/types'

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>) => ({
    query: (search.query as string) || undefined,
  }),
  loaderDeps: ({ search }) => ({ query: search.query }),
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
  const { tools } = Route.useLoaderData()

  return (
    <div className="min-h-screen">
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 texture-overlay opacity-20" />
        <div className="container mx-auto text-center max-w-4xl relative z-10 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4 animate-slide-up">
            Find the right AI tool for specific tasks
          </h2>
          <p
            className="text-lg md:text-xl text-muted-foreground mb-8 font-sans leading-relaxed animate-slide-up"
            style={{ animationDelay: '0.1s' }}
          >
            Discover tools tailored for your needs. Explore and choose the right AI solutions for your tasks.
          </p>

          <SearchBar />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <div key={tool.name} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <ToolCard tool={tool} />
              </div>
            ))}
            {tools.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground py-12">No tools found.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
