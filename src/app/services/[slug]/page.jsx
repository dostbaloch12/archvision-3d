import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { seoServices } from '@/lib/seoData'

function getService(slug) {
  return seoServices.find((service) => service.slug === slug)
}

export function generateStaticParams() {
  return seoServices.map((service) => ({
    slug: service.slug,
  }))
}

export function generateMetadata({ params }) {
  const service = getService(params.slug)

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://archvision3d.com'
  const url = `${baseUrl}/services/${service.slug}`

  return {
    title: service.metaTitle,
    description: service.description,
    keywords: service.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.description,
      url,
      type: 'website',
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: service.alt,
        },
      ],
    },
  }
}

export default function ServicePage({ params }) {
  const service = getService(params.slug)

  if (!service) {
    notFound()
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://archvision3d.com'
  const url = `${baseUrl}/services/${service.slug}`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.description,
      provider: {
        '@type': 'Organization',
        name: 'ArchVision 3D',
        url: baseUrl,
      },
      areaServed: 'Worldwide',
      url,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
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
          name: service.title,
          item: url,
        },
      ],
    },
  ]

  return (
    <main className="bg-[#F4F3F0] text-[#171717]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative min-h-[78vh] overflow-hidden">
        <Image
          src={service.image}
          alt={service.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F4F3F0] via-[#F4F3F0]/80 to-[#F4F3F0]/20" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F4F3F0] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-end px-6 pb-20 pt-28 md:px-12">
          <Link
            href="/"
            className="mb-10 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#77736B] transition-colors duration-500 hover:text-[#171717]"
          >
            ← Back to home
          </Link>

          <p className="text-xs uppercase tracking-[0.2em] text-[#171717]">{service.kicker}</p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl font-light leading-[0.95] tracking-tight text-white md:text-7xl">
            {service.h1}
          </h1>
          <p className="mt-8 max-w-2xl text-base text-[#77736B] md:text-lg">{service.intro}</p>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#F4F3F0] to-[#171717] py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-3 md:px-12">
          {service.sections.map((section) => (
            <article key={section.heading} className="border border-white/15 bg-white/5 p-7">
              <h2 className="font-serif text-2xl font-light tracking-tight text-white">
                {section.heading}
              </h2>
              <p className="mt-4 text-base text-white/70">{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#171717] to-[#171717] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[#171717]">Questions</p>
          <h2 className="mt-4 font-serif text-4xl font-light tracking-tight text-white md:text-5xl">
            Common questions.
          </h2>

          <div className="mt-12 divide-y divide-white/20 border-y border-white/20">
            {service.faqs.map((faq) => (
              <article key={faq.question} className="py-7">
                <h3 className="text-xl font-light tracking-tight text-white">{faq.question}</h3>
                <p className="mt-3 text-base text-white/75 md:text-lg">{faq.answer}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 border border-white/20 bg-white/10 p-8">
            <h2 className="font-serif text-3xl font-light tracking-tight text-white">
              Start a project conversation.
            </h2>
            <p className="mt-4 max-w-xl text-white/75">
              Send a short brief and we will respond within two working days.
            </p>
            <Link href="/#contact" className="btn-glow btn-blush mt-8">
              Contact the studio
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}