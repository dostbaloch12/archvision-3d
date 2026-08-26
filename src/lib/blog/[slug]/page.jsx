import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts } from '@/lib/blogData'

function getPost(slug) {
  return blogPosts.find((post) => post.slug === slug)
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug)

  if (!post) {
    return {
      title: 'Article Not Found',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.utopiandesignstudio.com'
  const url = `${baseUrl}/blog/${post.slug}`

  return {
    title: post.metaTitle,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.description,
      url,
      type: 'article',
    },
  }
}

export default function BlogPostPage({ params }) {
  const post = getPost(params.slug)

  if (!post) {
    notFound()
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.utopiandesignstudio.com'
  const url = `${baseUrl}/blog/${post.slug}`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.description,
      author: {
        '@type': 'Organization',
        name: 'Utopian Design Studio',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Utopian Design Studio',
      },
      mainEntityOfPage: url,
      datePublished: post.date,
      dateModified: post.date,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faqs.map((faq) => ({
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

      <article>
        <header className="site-container border-b border-[#d7d3ca] pb-20 pt-36">
          <Link href="/blog" className="editorial-textlink">
            Back to journal
          </Link>

          <p className="mt-16 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#77746c]">
            {post.category} · {post.readTime}
          </p>

          <h1 className="mt-6 max-w-[960px] font-[var(--font-manrope)] text-[clamp(52px,7vw,98px)] font-medium leading-[0.94] tracking-[-0.067em]">
            {post.title}
          </h1>

          <p className="mt-8 max-w-[760px] text-[17px] leading-[1.75] text-[#6c6961]">
            {post.intro}
          </p>
        </header>

        <section className="site-container max-w-4xl py-20">
          <div className="space-y-12">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-[var(--font-manrope)] text-[34px] font-medium leading-[1.05] tracking-[-0.05em]">
                  {section.heading}
                </h2>
                <p className="mt-5 text-[16px] leading-[1.85] text-[#6c6961]">{section.body}</p>
              </section>
            ))}
          </div>

          <div className="mt-16 border-y border-[#d7d3ca] py-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#77746c]">
              Questions
            </p>

            <div className="mt-8 space-y-8">
              {post.faqs.map((faq) => (
                <section key={faq.question}>
                  <h3 className="font-[var(--font-manrope)] text-[24px] font-medium tracking-[-0.04em]">
                    {faq.question}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.75] text-[#77746c]">{faq.answer}</p>
                </section>
              ))}
            </div>
          </div>

          <div className="mt-12 border border-[#d7d3ca] bg-[#eeece6] p-8">
            <h2 className="font-[var(--font-manrope)] text-[34px] font-medium tracking-[-0.05em]">
              Planning a project?
            </h2>
            <p className="mt-4 max-w-[640px] text-[15px] leading-[1.75] text-[#77746c]">
              Send your site, area and project goals. Utopian Design Studio will guide you with the
              right design direction.
            </p>
            <Link href="/#contact" className="editorial-button mt-8">
              Start a project ↗
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}