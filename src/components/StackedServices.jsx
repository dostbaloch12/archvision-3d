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
      className="scroll-mt-[92px] bg-[#191917] text-white"
      aria-labelledby="services-heading"
    >
      <div className="site-container flex min-h-[calc(100svh-92px)] flex-col justify-center py-12 md:py-14">
        <div className="grid gap-8 md:grid-cols-[1.45fr_0.55fr] md:items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#77746c]">
              02 — Services
            </p>

            <h2
              id="services-heading"
              className="mt-5 max-w-[980px] font-[var(--font-manrope)] text-[clamp(56px,6.4vw,96px)] font-medium leading-[0.95] tracking-[-0.067em] !text-white"
            >
              From concept to completion.
            </h2>
          </div>

          <p className="max-w-[430px] pt-2 text-[15px] leading-[1.7] tracking-[-0.015em] text-[#77746c] md:pt-16">
            Integrated architectural, interior, planning, development, and turnkey solutions across
            multiple project types.
          </p>
        </div>

        <div className="mt-16 border-t border-[#33332f] md:mt-20">
          {SERVICES.map((service) => (
            <a
              key={service.number}
              href="#contact"
              className="group grid gap-4 border-b border-[#33332f] py-6 transition-colors duration-300 hover:bg-white/[0.025] md:grid-cols-[70px_0.9fr_1.15fr] md:items-center md:py-7"
              aria-label={`Discuss ${service.title}`}
            >
              <span className="text-[12px] font-medium tracking-[0.08em] text-[#77746c]">
                {service.number}
              </span>

              <h3 className="font-[var(--font-manrope)] text-[28px] font-medium leading-[1.05] tracking-[-0.055em] !text-white md:text-[31px]">
                {service.title}
              </h3>

              <p className="max-w-[560px] text-[15px] leading-[1.65] tracking-[-0.02em] text-[#aaa]">
                {service.copy}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}