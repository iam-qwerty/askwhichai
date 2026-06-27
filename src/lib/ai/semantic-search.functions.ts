import { createServerFn } from '@tanstack/react-start'
import { getEmbedding } from './embedding.server'
import { supabase } from '../supabase-client.server'
import type { AITool } from '../types'

export const semanticSearch = createServerFn()
  .inputValidator((data: { query: string }) => data)
  .handler(async ({ data }) => {
    const queryEmbedding = await getEmbedding(data.query)
    const { data: results, error } = await supabase.rpc('semantic_search_openai', {
      query_embedding: queryEmbedding,
      match_threshold: 0.4,
      match_count: 5,
    })

    if (error) {
      console.error('Error performing semantic search:', error)
      return []
    }

    return results as AITool[]
  })
