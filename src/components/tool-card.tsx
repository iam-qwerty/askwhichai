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
    <Card className="group relative overflow-hidden bg-card backdrop-blur-sm border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-lg animate-fade-in">
      <div className="absolute inset-0 texture-overlay opacity-30" />

      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg text-start font-black text-foreground group-hover:text-accent transition-colors duration-300 truncate">
                {tool.name}
              </CardTitle>
            </div>
          </div>
          <div className="shrink-0">
            <PricingBadge model={tool.pricing as PricingModel} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 relative z-10 space-y-4">
        <CardDescription className="text-sm text-start leading-relaxed font-sans line-clamp-2 text-muted-foreground">
          {tool.description}
        </CardDescription>

        <div className="flex items-center gap-4 text-sm font-sans">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors cursor-default">
                <ThumbsUp className="w-4 h-4" />
                <span className="font-medium">{tool.upvotes}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Coming soon</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors cursor-default">
                <ThumbsDown className="w-4 h-4" />
                <span className="font-medium">{tool.downvotes}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Coming soon</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-border/50 hover:border-accent/50 hover:bg-accent/5 transition-all duration-200 bg-transparent"
            asChild
          >
            <Link to="/tool/$id" params={{ id: tool.id }}>
              <Eye className="w-4 h-4 mr-1" />
              Details
            </Link>
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200"
            asChild
          >
            <a href={tool.tool_url} target="_blank" rel="noopener noreferrer">
              <ExternalLinkIcon className="w-4 h-4 mr-1" />
              Visit
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
