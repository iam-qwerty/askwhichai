// ============================================================
// AskWhichAI — Tool card (grid item on home page)
// ============================================================
// Displays a single AI tool as a card in the grid. Shows:
//   - Tool name (with accent color on hover)
//   - Pricing badge (color-coded)
//   - Description (truncated to 2 lines)
//   - Upvote/downvote counts (visual only — voting coming soon)
//   - "Details" and "Visit" buttons
//
// Used on the home page inside the tool grid.
// ============================================================

'use client'
import {
  ExternalLinkIcon,
  Eye,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import PricingBadge from './pricing-badge'
import type { NewAITool, PricingModel } from '@/lib/types'
import { Link } from '@tanstack/react-router'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export const ToolCard = ({ tool }: { tool: NewAITool }) => {
  return (
    <Card className="h-full group relative overflow-hidden bg-card border-border/50 hover:border-border transition-[border-color,box-shadow] duration-200 hover:shadow-lg">
      <div className="absolute inset-0 texture-overlay opacity-30 pointer-events-none" />

      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg text-start font-bold text-foreground group-hover:text-primary transition-colors duration-200 truncate">
                {tool.name}
              </CardTitle>
            </div>
          </div>
          <div className="shrink-0">
            <PricingBadge model={tool.pricing as PricingModel} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 relative z-10 flex flex-col flex-1 gap-4">
        <CardDescription className="text-sm text-start leading-relaxed font-sans line-clamp-2 text-muted-foreground">
          {tool.description}
        </CardDescription>

        {/* Vote counts (display only — voting feature is planned) */}
        <div className="flex items-center gap-4 text-sm font-sans mt-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1.5 text-muted-foreground cursor-default">
                <ThumbsUp className="w-4 h-4" aria-hidden="true" />
                <span className="font-medium">{tool.upvotes ?? 0}</span>
                <span className="sr-only">upvotes</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Voting coming soon</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1.5 text-muted-foreground cursor-default">
                <ThumbsDown className="w-4 h-4" aria-hidden="true" />
                <span className="font-medium">{tool.downvotes ?? 0}</span>
                <span className="sr-only">downvotes</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Voting coming soon</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Action buttons: Details (internal link) + Visit (external link) */}
        <div className="flex items-center gap-2 pt-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            asChild
          >
            <Link to="/tool/$id" params={{ id: tool.id }}>
              <Eye className="w-4 h-4" aria-hidden="true" />
              Details
            </Link>
          </Button>
          <Button
            size="sm"
            className="flex-1"
            asChild
          >
            <a href={tool.tool_url} target="_blank" rel="noopener noreferrer">
              <ExternalLinkIcon className="w-4 h-4" aria-hidden="true" />
              Visit
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
