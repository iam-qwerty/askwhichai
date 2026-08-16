// ============================================================
// AskWhichAI — Supabase client (primary data layer)
// ============================================================
// Supabase is the app's single database. This client is used
// for:
//   1. Tool data (reads in tools.functions.ts, writes in admin.functions.ts)
//   2. Semantic search (Supabase RPC function with pgvector)
//
// Better Auth also stores its user/session tables in the same
// Supabase PostgreSQL database (see lib/auth.ts).
// ============================================================

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
