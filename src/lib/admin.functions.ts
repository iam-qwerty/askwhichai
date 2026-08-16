// ============================================================
// AskWhichAI — Admin functions (server-side)
// ============================================================
// Server function for inserting a new AI tool into the database.
// Called by the admin form (AdminToolForm component) when an
// admin user submits tool details.
//
// TODO: Add authentication check before allowing inserts.
// Currently the admin route is protected by Cloudflare Basic Auth,
// but a proper auth check should be added here as well.
// ============================================================

import { createServerFn } from '@tanstack/react-start'
import { supabase } from './supabase-client.server'

export const insertTool = createServerFn()
  // Validate that the required fields are provided
  .inputValidator((data: {
    name: string
    description: string
    tool_url: string
    slug: string
    category: string
    pricing: string
    tags: string[]
  }) => data)
  .handler(async ({ data }) => {
    // Insert a new row into the "tools" table in Supabase
    const { data: result, error } = await supabase
      .from('tools')
      .insert([
        {
          name: data.name,
          description: data.description,
          tool_url: data.tool_url,
          slug: data.slug,
          category: data.category,
          pricing: data.pricing,
          tags: data.tags,
        },
      ])

    if (error) {
      return {
        success: false as const,
        message: 'Error inserting tool into Supabase',
        error: error.message,
      }
    }
    return {
      success: true as const,
      message: 'Tool inserted successfully',
      error: null,
      data: result,
    }
  })
