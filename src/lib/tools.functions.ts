// ============================================================
// AskWhichAI — Tool data fetching (server functions)
// ============================================================
// These are TanStack Start "server functions" — they run on
// the server (or during SSR) and can be called from anywhere
// in the app as if they were regular async functions.
//
// Both functions query the "tools" table in Supabase.
// ============================================================

import { createServerFn } from '@tanstack/react-start'
import { supabase } from './supabase-client.server'
import type { AITool } from './types'

// The columns we fetch for every tool (excludes large/rarely-needed fields like full tags)
const columnsToBeFetched =
  'id, name, description, tool_url, pricing, upvotes, downvotes, slug, category, featured'

// --- Fetch all tools (max 9) ---
// Called on the home page to display the initial grid of tools.
// Limited to 9 results to keep the page fast and focused.
export const fetchTools = createServerFn().handler(async () => {
  const { data, error } = await supabase
    .from('tools')
    .select(columnsToBeFetched)
    .limit(9)

  if (error) {
    console.error('Error fetching tools from Supabase:', error)
    return []
  }
  return data as AITool[]
})

// --- Fetch a single tool by its UUID ---
// Called on the tool detail page (/tool/$id) to load one tool.
// Uses .single() because we expect exactly one match.
export const fetchToolById = createServerFn()
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const { data: tool, error } = await supabase
      .from('tools')
      .select(columnsToBeFetched)
      .eq('id', data.id)       // Filter by UUID
      .single()                 // Expect exactly one row

    if (error) {
      console.error('Error fetching tool from Supabase:', error)
      return null
    }
    return tool as AITool
  })
