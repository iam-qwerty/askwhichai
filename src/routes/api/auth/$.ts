// ============================================================
// AskWhichAI — Auth API catch-all route (/api/auth/*)
// ============================================================
// This route handles ALL requests to /api/auth/* by passing
// them to Better Auth's handler. Better Auth manages the
// entire auth lifecycle: sign-up, sign-in, sign-out, session
// checks, etc.
//
// The $ in the filename is a TanStack Router catch-all, so
// /api/auth/sign-in, /api/auth/session, etc. all hit this route.
//
// Both GET and POST methods are handled — Better Auth decides
// which endpoints use which method internally.
// ============================================================

import { createFileRoute } from '@tanstack/react-router'
import { auth } from '#/lib/auth'

export const Route = createFileRoute('/api/auth/$')({
  server: {
    handlers: {
      // Forward GET requests to Better Auth (e.g. session checks)
      GET: ({ request }) => auth.handler(request),
      // Forward POST requests to Better Auth (e.g. sign-in, sign-up)
      POST: ({ request }) => auth.handler(request),
    },
  },
})
