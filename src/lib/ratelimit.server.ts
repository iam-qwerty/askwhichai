// Rate limiting utility using Upstash Redis
// Used as server-side middleware for protecting search queries
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

let ratelimit: Ratelimit | undefined

try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, '1 m'),
      analytics: true,
      prefix: '@upstash/ratelimit',
    })
  }
} catch (error) {
  console.error('Failed to initialize Upstash Ratelimit:', error)
}

export async function checkRateLimit(ip: string) {
  if (!ratelimit) return { success: true }
  return ratelimit.limit(ip)
}

export { ratelimit }
