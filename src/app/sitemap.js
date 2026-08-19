import { seoProjects, seoServices } from '@/lib/seoData'

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://archvision3d.com'
  const lastModified = new Date()

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const serviceRoutes = seoServices.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const projectRoutes = seoProjects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes]
}