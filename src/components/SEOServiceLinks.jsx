import Link from 'next/link'
import { seoServices, seoProjects } from '@/lib/seoData'

export default function SEOServiceLinks() {
  return (
    <section className="bg-gradient-to-b from-[#9370BC] to-[#A77CC0] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#F6DCE8]">Explore</p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-[1.05] tracking-tight text-white md:text-5xl">
              Architecture services and case studies.
            </h2>
          </div>

          <div className="grid gap-8 md:col-span-8 md:grid-cols-2">
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#F6DCE8]">Services</h3>
              <ul className="mt-5 space-y-4">
                {seoServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group flex items-center justify-between border-b border-white/20 pb-3 text-white transition-colors duration-500 hover:text-[#F6DCE8]"
                    >
                      <span>{service.title}</span>
                      <span className="transition-transform duration-500 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#F6DCE8]">Case Studies</h3>
              <ul className="mt-5 space-y-4">
                {seoProjects.map((project) => (
                  <li key={project.slug}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group flex items-center justify-between border-b border-white/20 pb-3 text-white transition-colors duration-500 hover:text-[#F6DCE8]"
                    >
                      <span>{project.title}</span>
                      <span className="transition-transform duration-500 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}