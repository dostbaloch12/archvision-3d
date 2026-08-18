import {
  createCipheriv,
  createDecipheriv,
  createHmac,
  createHash,
  randomBytes,
  timingSafeEqual,
} from 'crypto'
import { getServerSecrets } from './env'

function keyBuffer() {
  return Buffer.from(getServerSecrets().encryptionKey, 'hex')
}

export function encryptText(plain) {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', keyBuffer(), iv)
  const encrypted = Buffer.concat([cipher.update(String(plain), 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted.toString('hex')}`
}

export function decryptText(payload) {
  const parts = String(payload || '').split(':')
  if (parts.length !== 3) {
    throw new Error('Invalid ciphertext')
  }
  const [ivHex, tagHex, dataHex] = parts
  const decipher = createDecipheriv('aes-256-gcm', keyBuffer(), Buffer.from(ivHex, 'hex'))
  decipher.setAuthTag(Buffer.from(tagHex, 'hex'))
  const out = Buffer.concat([decipher.update(Buffer.from(dataHex, 'hex')), decipher.final()])
  return out.toString('utf8')
}

export function hashValue(value) {
  return createHash('sha256')
    .update(`${getServerSecrets().appSecret}:${String(value).trim().toLowerCase()}`)
    .digest('hex')
}

export function issueFormToken() {
  const nonce = randomBytes(16).toString('hex')
  const iat = String(Date.now())
  const payload = `${iat}.${nonce}`
  const sig = createHmac('sha256', getServerSecrets().appSecret).update(payload).digest('hex')
  return `${payload}.${sig}`
}

const usedNonces = new Map()

function rememberNonce(nonce) {
  const now = Date.now()
  usedNonces.set(nonce, now)
  if (usedNonces.size > 4000) {
    usedNonces.forEach((time, key) => {
      if (now - time > 35 * 60 * 1000) {
        usedNonces.delete(key)
      }
    })
  }
}

export function verifyFormToken(token) {
  const parts = String(token || '').split('.')
  if (parts.length !== 3) {
    return { ok: false, error: 'Reload the page and try again.' }
  }

  const [iatRaw, nonce, sig] = parts
  const validShape =
    /^\d{10,15}$/.test(iatRaw) && /^[a-f0-9]{32}$/i.test(nonce) && /^[a-f0-9]{64}$/i.test(sig)

  if (!validShape) {
    return { ok: false, error: 'Reload the page and try again.' }
  }

  const payload = `${iatRaw}.${nonce}`
  const expected = createHmac('sha256', getServerSecrets().appSecret).update(payload).digest('hex')
  const left = Buffer.from(sig, 'hex')
  const right = Buffer.from(expected, 'hex')

  if (left.length !== right.length || !timingSafeEqual(left, right)) {
    return { ok: false, error: 'Reload the page and try again.' }
  }

  if (usedNonces.has(nonce)) {
    return { ok: false, error: 'This form was already used. Reload and try again.' }
  }

  const age = Date.now() - Number(iatRaw)
  if (age < 2000) {
    return { ok: false, error: 'Please wait a moment and try again.' }
  }
  if (age > 30 * 60 * 1000) {
    return { ok: false, error: 'The form expired. Reload the page.' }
  }

  rememberNonce(nonce)
  return { ok: true }
}