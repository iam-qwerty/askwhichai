// ============================================================
// AskWhichAI — Text embedding generation
// ============================================================
// Converts text (like a search query) into a vector embedding
// using an AI model. These embeddings are then compared using
// cosine similarity to find semantically related content.
//
// IMPORTANT: the query must be embedded with the SAME model that
// produced the stored tool embeddings. The tools table's
// `embedding_openai` column (used by the `semantic_search_openai`
// RPC) was generated with OpenAI `text-embedding-3-small`, which
// outputs 1536-dimensional vectors. Embedding queries with any
// other model puts them in a different vector space and makes
// similarity scores meaningless — and a different dimension count
// makes Postgres reject the query outright.
// ============================================================

import OpenAI from 'openai'

// The model and dimension that match the stored `embedding_openai` column.
const EMBEDDING_MODEL = 'text-embedding-3-small'
const EMBEDDING_DIMENSIONS = 1536

// Singleton client — reused across calls
let client: OpenAI | undefined

function getClient() {
  if (!client) {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error(
        'OPENAI_API_KEY is not set. Semantic search needs OpenAI embeddings ' +
          'to match the stored tool vectors.',
      )
    }
    client = new OpenAI({ apiKey })
  }
  return client
}

// Takes any text and returns a 1536-dimension vector embedding.
// Used by semantic-search to convert the user's query into an embedding
// that can be compared against tool embeddings in the database.
export async function getEmbedding(text: string): Promise<number[]> {
  const c = getClient()
  const { data } = await c.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text,
    dimensions: EMBEDDING_DIMENSIONS,  // Explicit: guarantees a 1536-dim match
    encoding_format: 'float',          // Returns raw float array
  })
  return data[0].embedding             // First (and only) embedding result
}
