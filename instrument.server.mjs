// ============================================================
// AskWhichAI — Sentry error monitoring (server-side init)
// ============================================================
// Initializes Sentry for server-side error tracking. This runs
// before the app starts and captures unhandled errors, tracing
// data, and performance metrics.
//
// Sentry is configured via VITE_SENTRY_DSN environment variable.
// If not set, Sentry is disabled with a warning.
// ============================================================

import * as Sentry from '@sentry/tanstackstart-react'

const sentryDsn = import.meta.env?.VITE_SENTRY_DSN ?? process.env.VITE_SENTRY_DSN

if (!sentryDsn) {
  console.warn('VITE_SENTRY_DSN is not defined. Sentry is not running.')
} else {
  Sentry.init({
    dsn: sentryDsn,
    sendDefaultPii: true,           // Adds IP and request headers for user context
    tracesSampleRate: 1.0,          // Trace 100% of requests
    replaysSessionSampleRate: 1.0,  // Record 100% of sessions
    replaysOnErrorSampleRate: 1.0,  // Record 100% of error sessions
  })
}
