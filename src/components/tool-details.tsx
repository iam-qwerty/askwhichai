import type { NewAITool, PricingModel } from '@/lib/types'
import { ExternalLinkIcon, ThumbsDown, ThumbsUp } from 'lucide-react'
import { Button } from './ui/button'
import PricingBadge from './pricing-badge'

export function ToolDetails({ tool }: { tool: NewAITool }) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-foreground">{tool.name}</h1>
          <PricingBadge model={tool.pricing as PricingModel} />
        </div>
        <p className="text-muted-foreground text-lg">{tool.description}</p>
      </div>

      <div className="flex items-center gap-6 text-sm font-sans">
        <div className="flex items-center gap-2 text-muted-foreground">
          <ThumbsUp className="w-5 h-5" />
          <span className="font-medium text-lg">{tool.upvotes}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <ThumbsDown className="w-5 h-5" />
          <span className="font-medium text-lg">{tool.downvotes}</span>
        </div>
      </div>

      <div className="pt-4">
        <Button
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
          asChild
        >
          <a href={tool.tool_url || '#'} target="_blank" rel="noopener noreferrer">
            <ExternalLinkIcon className="w-5 h-5 mr-2" />
            Visit Website
          </a>
        </Button>
      </div>

      <div className="p-4 rounded-lg bg-muted/30 border border-border/50 text-sm text-muted-foreground">
        <p>More detailed analytics and reviews coming soon.</p>
      </div>
    </div>
  )
}
