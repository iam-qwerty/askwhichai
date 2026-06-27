import { createServerFn } from '@tanstack/react-start'
import { supabase } from './supabase-client.server'

export const insertTool = createServerFn()
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
