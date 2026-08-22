'use client'

export default function Marquee({
  items = [],
  speed = 30,
  direction = 'left',
  className = '',
  separator = '—',
}) {
  const doubled = [...items, ...items]

  return (
    <div className={`marquee-wrap ${className}`} aria-label="Scrolling list">
      <div
        className="marquee-track"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {doubled.map((item, index) => (
          <span key={`${item}-${index}`} className="marquee-item">
            <span>{item}</span>
            <span aria-hidden="true" className="opacity-40">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
