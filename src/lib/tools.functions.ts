import { createServerFn } from '@tanstack/react-start'
import { supabase } from './supabase-client.server'
import type { AITool } from './types'

const columnsToBeFetched =
  'id, name, description, tool_url, pricing, upvotes, downvotes, slug, category, featured'

// Fetch all tools (limited to 9)
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

// Fetch a single tool by ID
export const fetchToolById = createServerFn()
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const { data: tool, error } = await supabase
      .from('tools')
      .select(columnsToBeFetched)
      .eq('id', data.id)
      .single()

    if (error) {
      console.error('Error fetching tool from Supabase:', error)
      return null
    }
    return tool as AITool
  })
