// ============================================================
// AskWhichAI — Tool detail view (full page)
// ============================================================
// Full-page view of a single AI tool, shown on the /tool/$id
// route. Includes the tool name, description, pricing badge,
// vote counts, and a prominent "Visit Website" button.
//
// This is the expanded version of what ToolCard shows in the
// grid — no truncation, larger text, more spacing.
// ============================================================

import type { NewAITool, PricingModel } from '@/lib/types'
import { ExternalLinkIcon, ThumbsDown, ThumbsUp } from 'lucide-react'
import { Button } from './ui/button'
import PricingBadge from './pricing-badge'

export function ToolDetails({ tool }: { tool: NewAITool }) {
  return (
    <div className="space-y-6">
      {/* Header: name + pricing badge side by side */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-3xl font-bold text-foreground min-w-0 break-words">{tool.name}</h1>
          <div className="shrink-0 pt-1.5">
            <PricingBadge model={tool.pricing as PricingModel} />
          </div>
        </div>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-prose">{tool.description}</p>
      </div>

      {/* Vote counts (display only — voting feature is planned) */}
      <div className="flex items-center gap-6 text-sm font-sans">
        <div className="flex items-center gap-2 text-muted-foreground">
          <ThumbsUp className="w-5 h-5" aria-hidden="true" />
          <span className="font-medium text-lg">{tool.upvotes ?? 0}</span>
          <span className="sr-only">upvotes</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <ThumbsDown className="w-5 h-5" aria-hidden="true" />
          <span className="font-medium text-lg">{tool.downvotes ?? 0}</span>
          <span className="sr-only">downvotes</span>
        </div>
      </div>

      {/* Call-to-action button */}
      <div className="pt-4">
        <Button size="lg" className="w-full" asChild>
          <a href={tool.tool_url} target="_blank" rel="noopener noreferrer">
            <ExternalLinkIcon className="w-5 h-5" aria-hidden="true" />
            Visit {tool.name}
          </a>
        </Button>
      </div>

      {/* Coming soon notice */}
      <div className="p-4 rounded-lg bg-muted/30 border border-border/50 text-sm text-muted-foreground">
        <p>More detailed analytics and reviews coming soon.</p>
      </div>
    </div>
  )
}
