const ITEMS = [
  'Architecture',
  'Interior Design',
  'Planning',
  'Turnkey Execution',
]

export default function UXAuditBadge() {
  return (
    <section className="border-y border-[#D9D6CF] bg-[#171717] py-5">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <ul className="grid gap-3 text-center md:grid-cols-4">
          {ITEMS.map((item) => (
            <li key={item} className="text-xs uppercase tracking-[0.2em] text-[#77736B]">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}