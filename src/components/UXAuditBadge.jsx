const ITEMS = [
  'Worldwide commissions',
  'Interactive 3D models',
  'Residential + commercial',
  'Private consultations',
]

export default function UXAuditBadge() {
  return (
    <section className="border-y border-white/15 bg-gradient-to-b from-[#44433f] to-[#141414] py-5">
      <div className="premium-container">
        <ul className="grid gap-3 text-center md:grid-cols-4">
          {ITEMS.map((item) => (
            <li
              key={item}
              className="text-xs uppercase tracking-[0.18em] text-white/75"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
