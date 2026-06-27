-- Schema for a simple to-do list (scaffold default)
CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Which AI — tools table
CREATE TABLE IF NOT EXISTS tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    tool_url TEXT NOT NULL,
    pricing TEXT NOT NULL,
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    slug TEXT NOT NULL,
    category TEXT,
    featured BOOLEAN DEFAULT FALSE,
    tags TEXT[],
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable pgvector for semantic search (requires Cloudflare support or Neon extension)
-- CREATE EXTENSION IF NOT EXISTS vector;
-- ALTER TABLE tools ADD COLUMN embedding_openai vector(1536);

-- Semantic search function (for use with Supabase RPC or direct SQL)
-- CREATE OR REPLACE FUNCTION semantic_search_openai(
--     query_embedding vector(1536),
--     match_threshold FLOAT,
--     match_count INT
-- ) RETURNS TABLE (
--     id UUID, name TEXT, description TEXT, tool_url TEXT,
--     pricing TEXT, upvotes INT, downvotes INT, slug TEXT,
--     category TEXT, featured BOOLEAN, similarity FLOAT
-- ) AS $$
--   SELECT id, name, description, tool_url, pricing, upvotes, downvotes,
--          slug, category, featured,
--          1 - (tools.embedding_openai <=> query_embedding) AS similarity
--   FROM tools
--   WHERE 1 - (tools.embedding_openai <=> query_embedding) > match_threshold
--   ORDER BY similarity DESC
--   LIMIT match_count;
-- $$ LANGUAGE sql;
