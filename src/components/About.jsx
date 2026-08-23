const LEADERS = [
  {
    name: 'Zubair Ahmed',
    role: 'Founder & CEO',
    quote:
      'At Utopian Design Studio, we believe architecture is not simply about creating buildings, but about shaping experiences that remain meaningful over time. Our aim is to combine thoughtful design, functionality, and lasting quality to create spaces that truly belong to their people and place.',
  },
  {
    name: 'Rasheed Ahmad',
    role: 'Director',
    quote:
      'Every successful project is built on clarity, collaboration, and attention to detail. We are committed to turning ideas into well-crafted spaces through a process that values quality, precision, and trust from the first concept to final completion.',
  },
]

export default function About() {
  return (
    <section
      id="about"
      className="grid min-h-[720px] w-full gap-[9%] py-[110px] font-[var(--font-manrope)] md:grid-cols-[0.7fr_1.3fr]"
    >
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#77746c]">
          05 — About
        </div>

        <h2 className="mt-4 max-w-[620px] font-[var(--font-manrope)] text-5xl font-medium leading-[1.05] tracking-[-0.055em] text-[#171715]">
          The Studio
        </h2>

        <p className="mt-7 max-w-[620px] font-[var(--font-manrope)] text-sm font-normal leading-[1.8] tracking-[-0.01em] text-[#77746c]">
          Utopian Design Studio is an architectural firm and design practice focused on creating
          thoughtful, functional, and timeless spaces. Our work spans architecture, interiors,
          planning, development, and turnkey solutions, with a commitment to design quality from
          concept through completion.
        </p>
      </div>

      <div className="border-t border-[#d7d3ca]">
        {LEADERS.map((leader) => (
          <article key={leader.name} className="border-b border-[#d7d3ca] py-[30px]">
            <div>
              <h3 className="font-[var(--font-manrope)] text-2xl font-medium leading-[1.08] tracking-[-0.045em] text-[#171715]">
                {leader.name}
              </h3>

              <div className="mt-[6px] font-[var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.12em] text-[#77746c]">
                {leader.role}
              </div>
            </div>

            <p className="mt-5 max-w-[760px] font-[var(--font-manrope)] text-[15px] font-normal italic leading-[1.75] tracking-[-0.015em] text-[#65625b]">
              “{leader.quote}”
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}