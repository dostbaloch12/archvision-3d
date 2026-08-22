import { issueFormToken } from '@/lib/crypto'
import { getIp, isRateLimited, isSameOrigin, json } from '@/lib/security'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request) {
  if (!isSameOrigin(request)) {
    return json({ error: 'Forbidden' }, 403)
  }

  if (isRateLimited(`token:${getIp(request)}`, 30)) {
    return json({ error: 'Too many requests.' }, 429, { 'Retry-After': '60' })
  }

  try {
    return json({ token: issueFormToken() })
  } catch {
    return json({ error: 'Server is missing security keys.' }, 500)
  }
}
