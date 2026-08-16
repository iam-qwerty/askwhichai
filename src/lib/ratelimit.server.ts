// ============================================================
// AskWhichAI — Rate limiting (Upstash Redis)
// ============================================================
// Server-side middleware that limits how often a single IP
// can call certain endpoints (like semantic search). This
// prevents abuse and keeps API costs under control.
//
// Uses Upstash Redis (serverless Redis) for fast, distributed
// rate limit tracking. Falls back gracefully if Redis is
// not configured (e.g. local dev without .env vars).
//
// Current limit: 5 requests per minute per IP (sliding window)
// ============================================================

import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

// Singleton — created once and cached
let ratelimit: Ratelimit | undefined

try {
  // Only initialize if Upstash credentials are available
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),           // Reads UPSTASH_REDIS_REST_URL and _TOKEN from env
      limiter: Ratelimit.slidingWindow(5, '1 m'),  // Max 5 requests per minute
      analytics: true,                  // Track usage in Upstash dashboard
      prefix: '@upstash/ratelimit',     // Redis key prefix
    })
  }
} catch (error) {
  console.error('Failed to initialize Upstash Ratelimit:', error)
}

// Call this before handling a request to check if the IP is over the limit.
// Returns { success: true } if allowed, { success: false } if rate-limited.
export async function checkRateLimit(ip: string) {
  if (!ratelimit) return { success: true }   // No rate limit configured — allow all
  return ratelimit.limit(ip)
}

export { ratelimit }
