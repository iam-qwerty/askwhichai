// ============================================================
// AskWhichAI — Better Auth client (browser-side)
// ============================================================
// Creates the auth client used in React components for:
//   - Checking if a user is logged in (useSession hook)
//   - Signing in / signing out
//   - Accessing user profile data
//
// Usage in components:
//   import { authClient } from '#/lib/auth-client'
//   const { data: session } = authClient.useSession()
// ============================================================

import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient()
