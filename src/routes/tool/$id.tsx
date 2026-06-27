import { createFileRoute, notFound } from '@tanstack/react-router'
import { fetchToolById } from '@/lib/tools.functions'
import { ToolDetails } from '@/components/tool-details'

export const Route = createFileRoute('/tool/$id')({
  loader: async ({ params }) => {
    const tool = await fetchToolById({ data: { id: params.id } })
    if (!tool) {
      throw notFound()
    }
    return { tool }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [{ title: `${loaderData.tool.name} — Which AI` }]
      : [{ title: 'Tool — Which AI' }],
  }),
  component: ToolPage,
  pendingComponent: ToolPageLoading,
})

function ToolPage() {
  const { tool } = Route.useLoaderData()

  return (
    <div className="container mx-auto max-w-2xl py-16 px-4">
      <div className="bg-card border border-border/50 rounded-xl p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 texture-overlay opacity-20" />
        <div className="relative z-10">
          <ToolDetails tool={tool} />
        </div>
      </div>
    </div>
  )
}

function ToolPageLoading() {
  return (
    <div className="container mx-auto max-w-2xl py-16 px-4">
      <div className="bg-card border border-border/50 rounded-xl p-8 shadow-2xl backdrop-blur-sm animate-pulse">
        <div className="space-y-4">
          <div className="h-8 bg-muted rounded w-2/3" />
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-5/6" />
        </div>
      </div>
    </div>
  )
}
