// ============================================================
// AskWhichAI — Semantic search (server function)
// ============================================================
// When a user types a query like "help me write blog posts",
// this function:
//   1. Converts the query into a vector embedding (via OpenAI)
//   2. Searches the database for tools with similar embeddings
//   3. Returns the top 5 most semantically similar results
//
// "Semantic" means it understands meaning, not just keywords.
// For example, searching "create images" could match tools
// described as "AI art generator" even without those exact words.
// ============================================================

import { createServerFn } from '@tanstack/react-start'
import { getEmbedding } from './embedding.server'
import { supabase } from '../supabase-client.server'
import type { AITool } from '../types'

export const semanticSearch = createServerFn()
  .inputValidator((data: { query: string }) => data)
  .handler(async ({ data }) => {
    // Step 1: Convert the user's text query into a numerical embedding
    const queryEmbedding = await getEmbedding(data.query)

    // Step 2: Call the Supabase pgvector RPC function that finds similar tools
    // The function compares embeddings using cosine distance (<-> operator)
    const { data: results, error } = await supabase.rpc('semantic_search_openai', {
      query_embedding: queryEmbedding,      // The embedding to match against
      match_threshold: 0.4,                 // Minimum similarity score (0-1)
      match_count: 5,                       // Return top 5 results
    })

    if (error) {
      console.error('Error performing semantic search:', error)
      return []
    }

    return results as AITool[]
  })
