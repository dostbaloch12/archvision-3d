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
    <section id="services" className="scroll-mt-[92px] bg-[#191917] text-white">
      <div className="site-container py-14 md:py-16">
        <div className="mb-9 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#888]">
              02 — Services
            </div>

            <h2 className="mt-4 max-w-[720px] font-[var(--font-manrope)] text-[clamp(46px,5.4vw,72px)] font-medium leading-[0.95] tracking-[-0.06em]">
              From concept to completion.
            </h2>
          </div>

          <p className="max-w-[390px] text-[14px] leading-[1.75] text-[#aaa]">
            Integrated architectural, interior, planning, development, and turnkey solutions across
            multiple project types.
          </p>
        </div>

        <div>
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="grid items-start border-t border-[#3b3b37] py-4 md:grid-cols-[70px_0.9fr_1.1fr] md:items-center"
            >
              <span className="text-[11px] text-[#777]">{service.number}</span>

              <h3 className="mt-2 font-[var(--font-manrope)] text-[26px] font-medium tracking-[-0.04em] md:mt-0">
                {service.title}
              </h3>

              <p className="mt-3 max-w-[520px] text-[14px] leading-[1.7] text-[#aaa] md:mt-0">
                {service.copy}
              </p>
            </div>
          ))}

          <div className="border-t border-[#3b3b37]" />
        </div>
      </div>
    </section>
  )
}
