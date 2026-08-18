const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const PROJECT_TYPES = new Set([
  'Residential Architecture',
  'Commercial & Civic',
  'Interior Architecture',
  '3D Vision & Massing',
])

const BUDGETS = new Set(['To be discussed', 'Under $500k', '$500k — $2M', '$2M — $10M', '$10M+'])
const TIMELINES = new Set(['Exploring', 'Within 6 months', '6 — 12 months', 'Already on site'])
const STATUSES = new Set(['new', 'read', 'archived'])

const WINDOW_MS = 10 * 60 * 1000
const MAX_HITS = 6
const hits = new Map()

export function clean(value, max = 2000) {
  return String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
}

export function getIp(request) {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim().slice(0, 80)
  }
  return (request.headers.get('x-real-ip') || 'unknown').slice(0, 80)
}

export function isRateLimited(ip, max = MAX_HITS) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((time) => now - time < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)

  if (hits.size > 5000) {
    hits.forEach((list, key) => {
      const next = list.filter((time) => now - time < WINDOW_MS)
      if (next.length) {
        hits.set(key, next)
      } else {
        hits.delete(key)
      }
    })
  }

  return recent.length > max
}

export function isSameOrigin(request) {
  const host = request.headers.get('host')
  if (!host) {
    return false
  }

  const origin = request.headers.get('origin')
  const referer = request.headers.get('referer')

  const matches = (raw) => {
    try {
      return new URL(raw).host === host
    } catch {
      return false
    }
  }

  if (origin) {
    return matches(origin)
  }
  if (referer) {
    return matches(referer)
  }
  return false
}

export function json(body, status = 200, extraHeaders = {}) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      ...extraHeaders,
    },
  })
}

export function pick(object, keys) {
  const out = {}
  keys.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      out[key] = object[key]
    }
  })
  return out
}

export function validateBrief(input) {
  const form = {
    name: clean(input.name, 80),
    email: clean(input.email, 120).toLowerCase(),
    phone: clean(input.phone, 40),
    type: clean(input.type, 80),
    budget: clean(input.budget, 40),
    timeline: clean(input.timeline, 40),
    location: clean(input.location, 120),
    area: clean(input.area, 40),
    message: clean(input.message, 4000),
    token: clean(input.token, 200),
    website: clean(input.website, 200),
  }

  if (form.website) {
    return { honeypot: true }
  }
  if (!form.name || form.name.length < 2) {
    return { error: 'Please tell us your name.' }
  }
  if (!EMAIL_RE.test(form.email)) {
    return { error: 'Please enter a valid email address.' }
  }
  if (form.phone && !/^[0-9+\-().\s]{6,40}$/.test(form.phone)) {
    return { error: 'Please enter a valid phone number.' }
  }
  if (!PROJECT_TYPES.has(form.type)) {
    return { error: 'Choose a valid project type.' }
  }
  if (!BUDGETS.has(form.budget)) {
    return { error: 'Choose a valid budget.' }
  }
  if (!TIMELINES.has(form.timeline)) {
    return { error: 'Choose a valid timeline.' }
  }
  if (!form.location) {
    return { error: 'Where is the site?' }
  }
  if (form.message.length < 12) {
    return { error: 'A sentence or two about the project helps.' }
  }

  return { form }
}

export function validateJournal(input) {
  const email = clean(input.email, 120).toLowerCase()
  const token = clean(input.token, 200)
  const website = clean(input.website, 200)

  if (website) {
    return { honeypot: true }
  }
  if (!EMAIL_RE.test(email)) {
    return { error: 'Please enter a valid email address.' }
  }
  return { email, token }
}

export function validateStatus(status) {
  const value = clean(status, 20)
  if (!STATUSES.has(value)) {
    return { error: 'Invalid status.' }
  }
  return { status: value }
}

export function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    String(value || '')
  )
}