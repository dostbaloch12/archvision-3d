export default function StudioIntro() {
  return (
    <section className="grid gap-[6%] border-y border-[#d7d3ca] py-[105px] md:grid-cols-[0.3fr_1fr]">
      <div className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#77746c]">
        01 — Studio
      </div>

      <div>
        <h2 className="max-w-[950px] font-[var(--font-manrope)] text-[clamp(36px,4.5vw,62px)] font-medium leading-[1.08] tracking-[-0.05em] text-[#171715]">
          Designing spaces. Defining experiences.
        </h2>

        <p className="mt-[27px] max-w-[750px] text-sm leading-[1.75] text-[#77746c]">
          Utopian Design Studio is a contemporary architectural firm and interior design studio
          creating functional, refined, and timeless spaces. We combine creative vision, thoughtful
          planning, and technical expertise to transform ideas into distinctive environments.
        </p>

        <div className="mt-8 font-[var(--font-manrope)] text-[22px] font-medium text-[#171715]">
          Thoughtful design. Meaningful spaces. Lasting value.
        </div>
      </div>
    </section>
  )
}