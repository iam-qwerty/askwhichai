// ============================================================
// AskWhichAI — Better Auth server configuration
// ============================================================
// This sets up the Better Auth library for authentication.
// It stores user/session data in our Supabase PostgreSQL
// database via a pg connection pool, and supports email/password
// login with TanStack Start cookie-based sessions.
//
// The `auth.handler(request)` function processes all
// auth-related API requests (sign in, sign up, sign out, etc.)
// and is called from the /api/auth/$ catch-all route.
//
// DATABASE_URL must be Supabase's Postgres connection string.
// The auth tables are created with `@better-auth/cli migrate`.
// ============================================================

import { betterAuth } from 'better-auth'
import { Pool } from 'pg'
import { tanstackStartCookies } from 'better-auth/tanstack-start'

export const auth = betterAuth({
  // Store users, sessions, accounts in Supabase PostgreSQL via pg
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  // Allow email + password sign-up/sign-in
  emailAndPassword: {
    enabled: true,
  },
  // Use HTTP-only cookies for TanStack Start (works with SSR)
  plugins: [tanstackStartCookies()],
})
