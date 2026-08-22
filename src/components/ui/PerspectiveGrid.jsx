export default function PerspectiveGrid({
  rows = 20,
  cols = 20,
  className = '',
  lineColor = 'rgba(255,255,255,0.12)',
  accentColor = 'rgba(206,212,106,0.18)',
}) {
  const rowItems = Array.from({ length: rows })
  const colItems = Array.from({ length: cols })

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rotate-x-[58deg] rotate-z-[-8deg] scale-110 opacity-60">
        <div className="relative h-full w-full">
          {rowItems.map((_, index) => (
            <span
              key={`row-${index}`}
              className="absolute left-0 right-0 h-px"
              style={{
                top: `${(index / Math.max(rows - 1, 1)) * 100}%`,
                background:
                  index % 5 === 0
                    ? `linear-gradient(90deg, transparent, ${accentColor}, transparent)`
                    : `linear-gradient(90deg, transparent, ${lineColor}, transparent)`,
              }}
            />
          ))}

          {colItems.map((_, index) => (
            <span
              key={`col-${index}`}
              className="absolute bottom-0 top-0 w-px"
              style={{
                left: `${(index / Math.max(cols - 1, 1)) * 100}%`,
                background:
                  index % 5 === 0
                    ? `linear-gradient(180deg, transparent, ${accentColor}, transparent)`
                    : `linear-gradient(180deg, transparent, ${lineColor}, transparent)`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F4F3F0]/40" />
    </div>
  )
}
