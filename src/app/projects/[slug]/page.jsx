import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { seoProjects } from '@/lib/seoData'

function getProject(slug) {
  return seoProjects.find((project) => project.slug === slug)
}

export function generateStaticParams() {
  return seoProjects.map((project) => ({
    slug: project.slug,
  }))
}

export function generateMetadata({ params }) {
  const project = getProject(params.slug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://archvision3d.com'
  const url = `${baseUrl}/projects/${project.slug}`

  return {
    title: `${project.title} — ${project.category} Case Study`,
    description: project.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${project.title} — ArchVision 3D`,
      description: project.description,
      url,
      type: 'article',
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.alt,
        },
      ],
    },
  }
}

export default function ProjectPage({ params }) {
  const project = getProject(params.slug)

  if (!project) {
    notFound()
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://archvision3d.com'
  const url = `${baseUrl}/projects/${project.slug}`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description: project.description,
      image: project.image,
      url,
      creator: {
        '@type': 'Organization',
        name: 'ArchVision 3D',
        url: baseUrl,
      },
      locationCreated: project.location,
      dateCreated: project.year,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: baseUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Projects',
          item: `${baseUrl}/#projects`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: project.title,
          item: url,
        },
      ],
    },
  ]

  return (
    <main className="bg-[#080808] text-[#F4EFE6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative min-h-[80vh] overflow-hidden">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/75 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080808] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-end px-6 pb-20 pt-28 md:px-12">
          <Link
            href="/#projects"
            className="mb-10 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8D806E] transition-colors duration-500 hover:text-[#F4EFE6]"
          >
            ← Back to projects
          </Link>

          <p className="text-xs uppercase tracking-[0.2em] text-[#F4EFE6]">
            {project.category} — {project.year}
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl font-light leading-[0.95] tracking-tight text-white md:text-7xl">
            {project.title}
          </h1>
          <p className="mt-6 text-base text-[#C9BCA8] md:text-lg">{project.location}</p>
          <p className="mt-8 max-w-2xl text-base text-[#C9BCA8] md:text-lg">
            {project.description}
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#080808] to-[#111111] py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-3 md:px-12">
          <article className="border border-white/15 bg-white/5 p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-[#E8DDCC]">Challenge</p>
            <h2 className="mt-4 font-serif text-2xl font-light tracking-tight text-white">
              The brief.
            </h2>
            <p className="mt-4 text-base text-white/70">{project.challenge}</p>
          </article>

          <article className="border border-white/15 bg-white/5 p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-[#E8DDCC]">Solution</p>
            <h2 className="mt-4 font-serif text-2xl font-light tracking-tight text-white">
              The response.
            </h2>
            <p className="mt-4 text-base text-white/70">{project.solution}</p>
          </article>

          <article className="border border-white/15 bg-white/5 p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-[#E8DDCC]">Result</p>
            <h2 className="mt-4 font-serif text-2xl font-light tracking-tight text-white">
              The outcome.
            </h2>
            <p className="mt-4 text-base text-white/70">{project.result}</p>
          </article>
        </div>

        <div className="mx-auto mt-16 max-w-7xl px-6 md:px-12">
          <div className="border border-white/20 bg-white/10 p-8 md:p-10">
            <h2 className="font-serif text-3xl font-light tracking-tight text-white md:text-4xl">
              Planning a similar project?
            </h2>
            <p className="mt-4 max-w-2xl text-white/75">
              Send your site, programme and ambitions. The studio will reply within two working
              days.
            </p>
            <Link href="/#contact" className="btn-glow btn-blush mt-8">
              Start a conversation
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}