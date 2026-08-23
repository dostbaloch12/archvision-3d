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
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://archvision-3d-ten.vercel.app',
  }
}

export function getServerSecrets() {
  assertNoPublicSecrets()

  return {
    web3formsKey: process.env.WEB3FORMS_ACCESS_KEY || '',
  }
}