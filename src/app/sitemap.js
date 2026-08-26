import { blogPosts } from '@/lib/blogData'
import { localSeoPages } from '@/lib/localSeoData'
import { seoProjects, seoServices } from '@/lib/seoData'

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.utopiandesignstudio.com'
  const lastModified = new Date()

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.75,
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

  const localRoutes = localSeoPages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

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

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.65,
  }))

  return [...staticRoutes, ...localRoutes, ...serviceRoutes, ...projectRoutes, ...blogRoutes]
}