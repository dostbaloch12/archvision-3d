import Link from 'next/link'
import { blogPosts } from '@/lib/blogData'

export const metadata = {
  title: 'Architecture & Interior Design Journal',
  description:
    'Guides and insights from Utopian Design Studio on architecture, interiors, house design, turnkey execution and 3D visualization.',
}

export default function BlogPage() {
  return (
    <main className="bg-[#f4f2ed] text-[#171715]">
      <section className="site-container min-h-[70vh] border-b border-[#d7d3ca] pb-20 pt-36">
        <Link href="/" className="editorial-textlink">
          Back to home
        </Link>

        <p className="mt-16 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#77746c]">
          Journal
        </p>

        <h1 className="mt-6 max-w-[900px] font-[var(--font-manrope)] text-[clamp(54px,7vw,104px)] font-medium leading-[0.92] tracking-[-0.067em]">
          Architecture and design notes for better project decisions.
        </h1>

        <p className="mt-8 max-w-[720px] text-[17px] leading-[1.75] text-[#6c6961]">
          Practical guides on architecture, interior design, house planning, turnkey execution and
          3D visualization for clients in Lahore, Pakistan and beyond.
        </p>
      </section>

      <section className="site-container py-20">
        <div className="grid gap-5 md:grid-cols-2">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group border border-[#d7d3ca] bg-[#eeece6] p-7 transition-colors duration-300 hover:bg-white"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#77746c]">
                {post.category} · {post.readTime}
              </p>

              <h2 className="mt-5 font-[var(--font-manrope)] text-[30px] font-medium leading-[1.05] tracking-[-0.05em]">
                {post.title}
              </h2>

              <p className="mt-5 text-[15px] leading-[1.75] text-[#77746c]">
                {post.description}
              </p>

              <span className="mt-6 inline-block text-[14px] transition-transform duration-300 group-hover:translate-x-1">
                Read article ↗
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}