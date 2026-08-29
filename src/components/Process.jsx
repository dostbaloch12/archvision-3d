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
      className="relative scroll-mt-[92px] overflow-hidden bg-[#171815] text-white"
      aria-labelledby="process-heading"
    >
      <div className="site-container flex min-h-auto flex-col justify-start py-14 md:h-[calc(100svh-92px)] md:pb-5 md:pt-4">
        <div className="grid shrink-0 gap-7 md:grid-cols-[1fr_430px] md:items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] !text-[#77746c]">
              04 — Process
            </p>

            <h2
              id="process-heading"
              className="mt-4 max-w-[920px] font-[var(--font-manrope)] text-[clamp(40px,11vw,62px)] font-medium leading-[0.98] tracking-[-0.065em] !text-white md:max-w-none md:whitespace-nowrap md:text-[clamp(44px,5.1vw,78px)] md:leading-[0.94] md:tracking-[-0.072em]"
            >
              How a project takes shape.
            </h2>
          </div>

          <p className="max-w-[430px] text-[14px] leading-[1.55] tracking-[-0.02em] !text-[#77746c] md:pt-[46px]">
            A clear, considered process — from first conversation
            <br className="hidden md:block" />
            <span className="md:hidden"> </span>
            to final handover with clarity and purpose.
          </p>
        </div>

        <div className="mt-10 min-h-0 flex-1 border-t border-[#30302c] md:mt-7">
          {STEPS.map((step) => (
            <article
              key={step.number}
              className="grid gap-3 border-b border-[#30302c] py-5 transition-colors duration-300 hover:bg-white/[0.025] md:grid-cols-[60px_0.34fr_0.56fr_0.62fr] md:items-start md:py-[13px]"
            >
              <span className="text-[12px] font-medium tracking-[0.08em] !text-[#77746c] md:text-[11px]">
                {step.number}
              </span>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] !text-[#77746c]">
                  {step.label}
                </p>
                <h3 className="mt-1 font-[var(--font-manrope)] text-[27px] font-medium leading-[1.05] tracking-[-0.055em] !text-white md:text-[25px]">
                  {step.title}
                </h3>
              </div>

              <p className="max-w-[430px] text-[14px] leading-[1.55] tracking-[-0.02em] !text-[#aaa] md:text-[13px] md:leading-[1.5]">
                {step.copy}
              </p>

              <ul className="space-y-1 text-[13px] leading-[1.55] !text-[#77746c] md:space-y-0.5 md:text-[12px] md:leading-[1.45]">
                {step.items.map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}