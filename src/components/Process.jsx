const STEPS = [
  {
    number: '01',
    label: 'Brief',
    title: 'Understanding',
    copy: 'Understanding the site, requirements, vision, and project goals.',
    items: ['Site & Context', 'Project Brief', 'Scope & Proposal'],
  },
  {
    number: '02',
    label: 'Concept',
    title: 'Shaping',
    copy: 'Shaping the idea through planning, form, space, and material.',
    items: ['Concept Design', 'Spatial Planning', 'Design Direction'],
  },
  {
    number: '03',
    label: 'Development',
    title: 'Refining',
    copy: 'Refining every element into a coordinated and buildable design.',
    items: ['Detailed Design', 'Material Selection', 'Working Drawings'],
  },
  {
    number: '04',
    label: 'Execution',
    title: 'Building',
    copy: 'Bringing the design to life with careful coordination and quality control.',
    items: ['Site Coordination', 'Contractor Management', 'Quality Control'],
  },
  {
    number: '05',
    label: 'Handover',
    title: 'Completing',
    copy: 'Completing the project with attention to detail, ready for use and enjoyment.',
    items: ['Final Inspection', 'Finishing & Snagging', 'Project Handover'],
  },
]

export default function Process() {
  return (
    <section
      id="process"
      className="scroll-mt-[92px] bg-[#eeece6] text-[#171715]"
      aria-labelledby="process-heading"
    >
      <div className="site-container flex flex-col justify-center py-16 md:min-h-[calc(100svh-92px)] md:py-20">
        <div className="grid gap-8 md:grid-cols-[1fr_390px] md:items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] !text-[#77746c]">
              04 — Process
            </p>

            <h2
              id="process-heading"
              className="mt-5 max-w-[980px] font-[var(--font-manrope)] text-[clamp(40px,11vw,58px)] font-medium leading-[1] tracking-[-0.065em] !text-[#171715] md:text-[clamp(48px,5.5vw,86px)] md:leading-[0.98] md:tracking-[-0.072em]"
            >
              How a project takes shape.
            </h2>
          </div>

          <p className="text-[14px] leading-[1.6] tracking-[-0.02em] !text-[#77746c] md:pt-[54px] md:text-[15px]">
            A clear, considered process—from the first conversation to final handover. We bring
            together design, technical expertise, and execution.
          </p>
        </div>

        <div className="mt-12 grid border-t border-[#d7d3ca] md:mt-16 md:grid-cols-5">
          {STEPS.map((step, index) => (
            <article
              key={step.number}
              className={`border-b border-[#d7d3ca] py-8 md:min-h-[370px] md:border-b-0 md:px-6 md:py-9 ${
                index === 0 ? 'md:pl-0' : ''
              } ${index !== STEPS.length - 1 ? 'md:border-r' : ''}`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] !text-[#77746c]">
                {step.number} — {step.label}
              </p>

              <h3 className="mt-10 font-[var(--font-manrope)] text-[27px] font-medium leading-[1.05] tracking-[-0.055em] !text-[#171715] md:mt-14 md:text-[28px]">
                {step.title}
              </h3>

              <p className="mt-5 text-[13px] leading-[1.75] tracking-[-0.02em] !text-[#77746c] md:min-h-[74px]">
                {step.copy}
              </p>

              <ul className="mt-8 border-t border-[#d7d3ca] pt-6 md:mt-12 md:pt-7">
                {step.items.map((item) => (
                  <li
                    key={item}
                    className="my-2 text-[12px] leading-[1.6] tracking-[-0.01em] !text-[#55524b]"
                  >
                    — {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}