// ============================================================
// AskWhichAI — Shared TypeScript types
// ============================================================
// These types are used across the app to ensure consistency
// between the database, server functions, and React components.
// When the database schema changes, update this file too.
// ============================================================

// Represents a single AI tool as stored in the database.
// Maps 1:1 to the "tools" table in schema.ts.
export interface AITool {
  id: string
  name: string                      // Display name
  description: string               // What the tool does
  tool_url: string                  // Website URL
  pricing: string                   // 'free' | 'freemium' | 'paid' | 'open-source'
  upvotes: number | null
  downvotes: number | null
  slug: string                      // URL-friendly name (e.g. "chat-gpt")
  category: string | null
  featured: boolean | null
  tags: string[] | null
  added_at: string | null
}

// NewAITool is an alias for AITool — includes all fields that
// ToolCard and ToolDetails components need to render.
// (Separated for future flexibility if we add display-only fields.)
export interface NewAITool extends AITool {}

// The exact pricing values allowed. Used by PricingBadge for
// color-coding and by the admin form for the dropdown.
export type PricingModel = 'free' | 'open-source' | 'freemium' | 'paid'
