const ITEMS = [
  'Architecture',
  'Interior Design',
  'Planning',
  'Turnkey Execution',
]

export default function UXAuditBadge() {
  return (
    <section className="border-y border-[#2A2A2A] bg-[#111111] py-5">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <ul className="grid gap-3 text-center md:grid-cols-4">
          {ITEMS.map((item) => (
            <li key={item} className="text-xs uppercase tracking-[0.2em] text-[#C9BCA8]">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}