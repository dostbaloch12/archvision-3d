import Image from 'next/image'

const PROJECTS = [
  {
    title: 'Private Residence',
    meta: 'Residential · Lahore',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1500&q=90',
  },
  {
    title: 'Contemporary House',
    meta: 'Residential · Pakistan',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=90',
  },
  {
    title: 'Urban Residence',
    meta: 'Residential · Lahore',
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=90',
  },
  {
    title: 'Hospitality Concept',
    meta: 'Hospitality · Pakistan',
    image:
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1500&q=90',
  },
  {
    title: 'Commercial Workplace',
    meta: 'Commercial',
    image:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=90',
  },
  {
    title: 'Office Environment',
    meta: 'Commercial',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=90',
  },
  {
    title: 'Institutional Building',
    meta: 'Institutional',
    image:
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=90',
  },
  {
    title: 'Mixed-Use Development',
    meta: 'Mixed-Use',
    image:
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1500&q=90',
  },
  {
    title: 'Interior Architecture',
    meta: 'Interior · Pakistan',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=90',
  },
]

const SPANS = [
  'md:col-span-7',
  'md:col-span-5',
  'md:col-span-5',
  'md:col-span-7',
  'md:col-span-4',
  'md:col-span-4',
  'md:col-span-4',
  'md:col-span-7',
  'md:col-span-5',
]

export default function ProjectShowcase() {
  return (
    <section id="projects" className="py-[110px]">
      <div className="site-container">
        <div className="mb-[52px] flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#77746c]">
              03 — Selected Work
            </div>
            <h2 className="mt-4 font-[var(--font-manrope)] text-[clamp(42px,5vw,66px)] font-medium tracking-[-0.05em]">
              All Projects
            </h2>
          </div>
          <p className="max-w-[350px] text-[13px] leading-[1.6] text-[#77746c]">
            A growing body of architectural work across residential, commercial, hospitality,
            institutional and mixed-use environments.
          </p>
        </div>

        <div className="mb-[35px] flex gap-[25px] overflow-auto whitespace-nowrap text-[10px] uppercase tracking-[0.1em] text-[#77746c]">
          <span className="border-b border-[#171715] pb-[6px] text-[#171715]">All</span>
          <span>Residential</span>
          <span>Commercial</span>
          <span>Hospitality</span>
          <span>Institutional</span>
          <span>Mixed-Use</span>
        </div>

        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-12">
          {PROJECTS.map((project, index) => (
            <article
              key={`${project.title}-${index}`}
              className={`${SPANS[index]} group relative h-[430px] overflow-hidden md:h-[500px]`}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-x-0 bottom-0 z-[1] h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-[22px] left-[23px] z-[3] text-white">
                <h3 className="font-[var(--font-manrope)] text-[25px] font-medium">{project.title}</h3>
                <p className="mt-[7px] text-[9px] uppercase tracking-[0.15em]">{project.meta}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}