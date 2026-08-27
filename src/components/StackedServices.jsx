const SERVICES = [
  {
    number: '01',
    title: 'Architecture',
    copy: 'Buildings shaped around purpose, context, performance and enduring design quality.',
  },
  {
    number: '02',
    title: 'Planning',
    copy: 'Strategic spatial planning, feasibility, zoning and development thinking.',
  },
  {
    number: '03',
    title: 'Interior Design',
    copy: 'Refined interior environments with coordinated materials, lighting and detail.',
  },
  {
    number: '04',
    title: 'Renovation',
    copy: 'Careful transformation of existing buildings through considered interventions.',
  },
  {
    number: '05',
    title: 'Development',
    copy: 'Design-led development solutions from early strategy through delivery.',
  },
  {
    number: '06',
    title: 'Turnkey Execution',
    copy: 'Integrated coordination and execution from approved design to final handover.',
  },
]

export default function StackedServices() {
  return (
    <section
      id="services"
      className="relative scroll-mt-[92px] overflow-hidden bg-[#171815] text-white"
      aria-labelledby="services-heading"
    >
      <div className="site-container flex min-h-[calc(100svh-92px)] flex-col justify-start pb-5 pt-3 md:pb-6 md:pt-4">
        <div className="grid gap-8 md:grid-cols-[1.25fr_0.75fr] md:items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] !text-[#77746c]">
              02 — Services
            </p>

            <h2
              id="services-heading"
              className="mt-4 max-w-none whitespace-nowrap font-[var(--font-manrope)] text-[clamp(48px,5.65vw,88px)] font-medium leading-[0.94] tracking-[-0.072em] !text-white"
            >
              From concept to completion.
            </h2>
          </div>

          <p className="max-w-none pt-[18px] text-[17px] leading-[1.45] tracking-[-0.03em] !text-[#77746c] md:pt-[26px]">
            Integrated architectural, interior, planning, development,
            <br />
            and turnkey solutions across multiple project types.
          </p>
        </div>

        <div className="mt-10 border-t border-[#30302c] md:mt-12">
          {SERVICES.map((service) => (
            <a
              key={service.number}
              href="#contact"
              className="group grid gap-3 border-b border-[#30302c] py-[18px] transition-colors duration-300 hover:bg-white/[0.025] md:grid-cols-[70px_0.46fr_0.9fr] md:items-center"
              aria-label={`Discuss ${service.title}`}
            >
              <span className="text-[12px] font-medium tracking-[0.08em] !text-[#77746c]">
                {service.number}
              </span>

              <h3 className="font-[var(--font-manrope)] text-[28px] font-medium leading-[1.05] tracking-[-0.055em] !text-white md:text-[31px]">
                {service.title}
              </h3>

              <p className="max-w-[610px] text-[15px] leading-[1.55] tracking-[-0.02em] !text-[#aaa]">
                {service.copy}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}