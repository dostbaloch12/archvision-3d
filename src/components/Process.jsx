const STEPS = [
  {
    number: '01 — Brief',
    title: 'Understanding',
    copy: 'Understanding the site, requirements, vision, and project goals.',
    list: ['Site & Context', 'Project Brief', 'Scope & Proposal'],
  },
  {
    number: '02 — Concept',
    title: 'Shaping',
    copy: 'Shaping the idea through planning, form, space, and material.',
    list: ['Concept Design', 'Spatial Planning', 'Design Direction'],
  },
  {
    number: '03 — Development',
    title: 'Refining',
    copy: 'Refining every element into a coordinated and buildable design.',
    list: ['Detailed Design', 'Material Selection', 'Working Drawings'],
  },
  {
    number: '04 — Execution',
    title: 'Building',
    copy: 'Bringing the design to life with careful coordination and quality control.',
    list: ['Site Coordination', 'Contractor Management', 'Quality Control'],
  },
  {
    number: '05 — Handover',
    title: 'Completing',
    copy: 'Completing the project with attention to detail, ready for use and enjoyment.',
    list: ['Final Inspection', 'Finishing & Snagging', 'Project Handover'],
  },
]

export default function Process() {
  return (
    <section id="process" className="bg-[#eeece6]">
      <div className="site-container py-[110px]">
        <div className="mb-[52px] flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#77746c]">
              04 — Process
            </div>
            <h2 className="mt-4 font-[var(--font-manrope)] text-[clamp(42px,5vw,66px)] font-medium tracking-[-0.05em]">
              How a project takes shape.
            </h2>
          </div>
          <p className="max-w-[350px] text-[13px] leading-[1.6] text-[#77746c]">
            A clear, considered process—from the first conversation to final handover. We bring
            together design, technical expertise, and execution.
          </p>
        </div>

        <div className="grid border-t border-[#d7d3ca] md:grid-cols-5">
          {STEPS.map((step) => (
            <article
              key={step.number}
              className="border-b border-[#d7d3ca] py-[30px] pr-[22px] md:mr-[22px] md:border-b-0 md:border-r"
            >
              <span className="text-[10px] uppercase tracking-[0.12em] text-[#77746c]">
                {step.number}
              </span>
              <h3 className="my-[38px] mb-3 font-[var(--font-manrope)] text-[23px] font-medium">
                {step.title}
              </h3>
              <p className="min-h-[88px] text-[14px] leading-[1.7] text-[#77746c]">{step.copy}</p>

              <ul className="mt-5 border-t border-[#d7d3ca] pt-[17px]">
                {step.list.map((item) => (
                  <li key={item} className="my-2 text-[11px] text-[#55524b]">
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
