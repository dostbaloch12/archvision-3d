const fs = require('fs')
const path = require('path')

const ROOT = process.cwd()
const SKIP = new Set(['node_modules', '.next', '.git', 'out'])
const DANGER = [
  /SERVICE_ROLE/i,
  /BEGIN (RSA |OPENSSH )?PRIVATE KEY/,
  /sk_live_/,
  /WEB3FORMS_ACCESS_KEY\s*=\s*['\"]?[a-f0-9-]{20,}/i,
]

function walk(dir, files = []) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    if (SKIP.has(entry.name) || entry.name.startsWith('.env')) {
      return
    }
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full, files)
    } else if (/\.(js|jsx|mjs|ts|tsx|md|json|sql)$/.test(entry.name)) {
      files.push(full)
    }
  })
  return files
}

const hits = []
walk(ROOT).forEach((file) => {
  const text = fs.readFileSync(file, 'utf8')
  DANGER.forEach((pattern) => {
    if (pattern.test(text)) {
      hits.push(`${path.relative(ROOT, file)} → ${pattern}`)
    }
  })
})

if (hits.length) {
  console.error('Possible secrets found:\n' + hits.join('\n'))
  process.exit(1)
}

console.log('No obvious secrets in source.')