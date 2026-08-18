// Simple in-memory rate limiter (per server instance).
// For production scale, upgrade to Upstash Redis rate limiting.

const WINDOW_MS = 60_000 // 1 minute
const MAX_REQUESTS = 3

const store = new Map()

export function checkRateLimit(identifier) {
  const now = Date.now()
  const record = store.get(identifier)

  if (!record || now - record.start > WINDOW_MS) {
    store.set(identifier, { count: 1, start: now })
    return { allowed: true }
  }

  if (record.count >= MAX_REQUESTS) {
    return { allowed: false }
  }

  record.count += 1
  return { allowed: true }
}