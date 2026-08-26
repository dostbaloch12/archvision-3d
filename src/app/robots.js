export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.utopiandesignstudio.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/admin/login/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}