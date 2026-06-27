export interface AITool {
  id: string
  name: string
  description: string
  tool_url: string
  pricing: string
  upvotes: number | null
  downvotes: number | null
  slug: string
  category: string | null
  featured: boolean | null
  tags: string[] | null
  added_at: string | null
}

// NewAITool includes all display fields used by ToolCard and ToolDetails
export interface NewAITool extends AITool {}

export type PricingModel = 'free' | 'open-source' | 'freemium' | 'paid'
