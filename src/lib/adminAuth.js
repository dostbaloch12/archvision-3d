import crypto from 'crypto'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const COOKIE_NAME = 'utopian_admin_session'
const SESSION_SECONDS = 60 * 60 * 8

function getAppSecret() {
  const secret = process.env.APP_SECRET

  if (!secret || secret.length < 32) {
    throw new Error('APP_SECRET must be at least 32 characters')
  }

  return secret
}

function sign(value) {
  return crypto.createHmac('sha256', getAppSecret()).update(value).digest('hex')
}

function safeEqual(a, b) {
  const aBuffer = Buffer.from(a)
  const bBuffer = Buffer.from(b)

  if (aBuffer.length !== bBuffer.length) {
    return false
  }

  return crypto.timingSafeEqual(aBuffer, bBuffer)
}

export function verifyAdminPassword(password) {
  const expected = process.env.ADMIN_PASSWORD

  if (!expected) {
    throw new Error('Missing ADMIN_PASSWORD')
  }

  return safeEqual(String(password || ''), expected)
}

export function createSessionValue() {
  const expiresAt = Date.now() + SESSION_SECONDS * 1000
  const payload = String(expiresAt)
  const signature = sign(payload)

  return `${payload}.${signature}`
}

export function verifySessionValue(value) {
  if (!value || !value.includes('.')) {
    return false
  }

  const [expiresAt, signature] = value.split('.')

  if (!expiresAt || !signature) {
    return false
  }

  if (Number(expiresAt) < Date.now()) {
    return false
  }

  const expected = sign(expiresAt)

  return safeEqual(signature, expected)
}

export function isAdminAuthenticated() {
  const session = cookies().get(COOKIE_NAME)?.value
  return verifySessionValue(session)
}

export function requireAdmin() {
  if (!isAdminAuthenticated()) {
    redirect('/admin/login')
  }
}

export function setAdminSession() {
  cookies().set(COOKIE_NAME, createSessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_SECONDS,
  })
}

export function clearAdminSession() {
  cookies().set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
}