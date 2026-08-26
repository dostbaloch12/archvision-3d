import Link from 'next/link'
import { blogPosts } from '@/lib/blogData'

export default function BlogPreview() {
  const posts = blogPosts.slice(0, 3)

  return (
    <section className="border-y border-[#d7d3ca] bg-[#eeece6] py-20">
      <div className="site-container">
        <div className="mb-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#77746c]">
              Journal
            </p>
            <h2 className="mt-4 max-w-[760px] font-[var(--font-manrope)] text-[clamp(42px,5vw,66px)] font-medium leading-[1.02] tracking-[-0.05em]">
              Useful guidance before starting a project.
            </h2>
          </div>

          <Link href="/blog" className="editorial-textlink">
            View all articles
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group border border-[#d7d3ca] bg-[#f4f2ed] p-6 transition-colors duration-300 hover:bg-white"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#77746c]">
                {post.category}
              </p>
              <h3 className="mt-4 font-[var(--font-manrope)] text-[26px] font-medium leading-[1.05] tracking-[-0.045em]">
                {post.title}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.7] text-[#77746c]">{post.description}</p>
              <span className="mt-5 inline-block text-[14px] transition-transform duration-300 group-hover:translate-x-1">
                Read more ↗
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}