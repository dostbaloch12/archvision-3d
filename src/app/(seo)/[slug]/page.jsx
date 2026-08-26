import Link from 'next/link'
import { notFound } from 'next/navigation'
import { localSeoPages } from '@/lib/localSeoData'

function getPage(slug) {
  return localSeoPages.find((page) => page.slug === slug)
}

export function generateStaticParams() {
  return localSeoPages.map((page) => ({
    slug: page.slug,
  }))
}

export function generateMetadata({ params }) {
  const page = getPage(params.slug)

  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.utopiandesignstudio.com'
  const url = `${baseUrl}/${page.slug}`

  return {
    title: page.metaTitle,
    description: page.description,
    keywords: [page.keyword, ...page.serviceAreas],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.description,
      url,
      type: 'website',
    },
  }
}

export default function LocalSeoPage({ params }) {
  const page = getPage(params.slug)

  if (!page) {
    notFound()
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.utopiandesignstudio.com'
  const url = `${baseUrl}/${page.slug}`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ArchitecturalService',
      name: 'Utopian Design Studio',
      url,
      description: page.description,
      areaServed: page.serviceAreas,
      telephone: '+92 301 3918872',
      email: 'utopiandesignstuido7@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '7CC, DHA Phase 4',
        addressLocality: 'Lahore',
        addressCountry: 'PK',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ]

  return (
    <main className="bg-[#f4f2ed] text-[#171715]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="site-container min-h-[72vh] border-b border-[#d7d3ca] pb-20 pt-36">
        <Link
          href="/"
          className="inline-flex border-b border-[#171715] pb-[7px] text-[11px] font-semibold tracking-[0.1em] text-[#171715]"
        >
          Back to home
        </Link>

        <p className="mt-16 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#77746c]">
          {page.title}
        </p>

        <h1 className="mt-6 max-w-[920px] font-[var(--font-manrope)] text-[clamp(54px,7vw,104px)] font-medium leading-[0.92] tracking-[-0.067em]">
          {page.h1}
        </h1>

        <p className="mt-8 max-w-[720px] text-[17px] leading-[1.75] text-[#6c6961]">
          {page.intro}
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {page.serviceAreas.map((area) => (
            <span
              key={area}
              className="border border-[#d7d3ca] px-4 py-2 text-[12px] text-[#77746c]"
            >
              {area}
            </span>
          ))}
        </div>
      </section>

      <section className="site-container py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {page.sections.map((section) => (
            <article key={section.heading} className="border border-[#d7d3ca] bg-[#eeece6] p-7">
              <h2 className="font-[var(--font-manrope)] text-[26px] font-medium tracking-[-0.04em]">
                {section.heading}
              </h2>
              <p className="mt-5 text-[15px] leading-[1.75] text-[#77746c]">{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#eeece6] py-20">
        <div className="site-container">
          <div className="mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#77746c]">
              Questions
            </p>
            <h2 className="mt-4 font-[var(--font-manrope)] text-[clamp(42px,5vw,66px)] font-medium tracking-[-0.05em]">
              Common questions.
            </h2>
          </div>

          <div className="border-t border-[#d7d3ca]">
            {page.faqs.map((faq) => (
              <article key={faq.question} className="border-b border-[#d7d3ca] py-7">
                <h3 className="font-[var(--font-manrope)] text-[24px] font-medium tracking-[-0.04em]">
                  {faq.question}
                </h3>
                <p className="mt-3 max-w-[820px] text-[15px] leading-[1.75] text-[#77746c]">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 border border-[#d7d3ca] bg-[#f4f2ed] p-8">
            <h2 className="font-[var(--font-manrope)] text-[34px] font-medium tracking-[-0.045em]">
              Start your project conversation.
            </h2>
            <p className="mt-4 max-w-[650px] text-[15px] leading-[1.75] text-[#77746c]">
              Send your site, area, budget and project goals. The studio will review your brief and
              respond with the next steps.
            </p>
            <Link href="/#contact" className="editorial-button mt-8">
              Contact the studio ↗
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}