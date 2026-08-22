function required(name) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing ${name}. Copy .env.example to .env.local`)
  }
  return value
}

export function assertNoPublicSecrets() {
  const leaked = Object.keys(process.env).filter((key) => {
    if (!key.startsWith('NEXT_PUBLIC_')) {
      return false
    }
    return /SERVICE_ROLE|SECRET|PASSWORD|PRIVATE|ENCRYPTION/i.test(key)
  })

  if (leaked.length) {
    throw new Error(`Secret exposed as public env: ${leaked.join(', ')}`)
  }
}

export function getPublicEnv() {
  assertNoPublicSecrets()
  return {
    supabaseUrl: required('NEXT_PUBLIC_SUPABASE_URL'),
    supabaseAnonKey: required('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  }
}

export function getServerSecrets() {
  assertNoPublicSecrets()
  const appSecret = required('APP_SECRET')
  const encryptionKey = required('ENCRYPTION_KEY')

  if (appSecret.length < 32) {
    throw new Error('APP_SECRET must be at least 32 characters')
  }
  if (!/^[a-f0-9]{64}$/i.test(encryptionKey)) {
    throw new Error('ENCRYPTION_KEY must be 64 hex chars. Generate with node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"')
  }

  return {
    appSecret,
    encryptionKey,
    web3formsKey: process.env.WEB3FORMS_ACCESS_KEY || '',
  }
}
