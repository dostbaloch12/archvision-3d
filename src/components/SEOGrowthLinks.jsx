import Link from 'next/link'
import { localSeoPages } from '@/lib/localSeoData'

export default function SEOGrowthLinks() {
  return (
    <section className="border-y border-[#d7d3ca] bg-[#eeece6] py-20">
      <div className="site-container">
        <div className="mb-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#77746c]">
              Explore Services
            </p>
            <h2 className="mt-4 max-w-[760px] font-[var(--font-manrope)] text-[clamp(42px,5vw,66px)] font-medium leading-[1.02] tracking-[-0.05em]">
              Architecture and design services for Lahore, Pakistan and remote clients.
            </h2>
          </div>

          <p className="max-w-[390px] text-[15px] leading-[1.75] text-[#77746c]">
            These pages explain our services by location, project type and client need.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {localSeoPages.map((page) => (
            <Link
              key={page.slug}
              href={`/${page.slug}`}
              className="group border border-[#d7d3ca] bg-[#f4f2ed] p-5 transition-colors duration-300 hover:bg-white"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#77746c]">
                {page.keyword}
              </p>
              <h3 className="mt-3 font-[var(--font-manrope)] text-[24px] font-medium leading-[1.08] tracking-[-0.04em]">
                {page.title}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.7] text-[#77746c]">
                {page.description}
              </p>
              <span className="mt-5 inline-block text-[14px] transition-transform duration-300 group-hover:translate-x-1">
                Learn more ↗
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}