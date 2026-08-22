import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms governing use of the ArchVision 3D website.',
}

const SECTIONS = [
  {
    heading: 'Use of this site',
    body: 'This website is provided for informational purposes to showcase the architectural work and services of ArchVision 3D.',
  },
  {
    heading: 'Intellectual property',
    body: 'All project imagery, 3D models, written content and design materials are the property of ArchVision 3D unless otherwise credited. They may not be copied, distributed or used commercially without written permission.',
  },
  {
    heading: 'Enquiries are not contracts',
    body: 'Submitting the contact form does not create a binding agreement or reserve studio capacity. All commissions proceed only under a separate signed contract.',
  },
  {
    heading: 'Accuracy of visualisations',
    body: '3D models and renders shown on this website are illustrative. They are not construction documents and must not be relied upon for building, costing or regulatory purposes.',
  },
  {
    heading: 'External links',
    body: 'Links to third-party websites are provided for convenience. We do not control and are not responsible for their content, privacy policies or availability.',
  },
  {
    heading: 'Limitation of liability',
    body: 'ArchVision 3D is not liable for any direct or indirect loss arising from use of this website or reliance on its content.',
  },
]

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#080808] to-[#262626] py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 md:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8D806E] transition-colors duration-500 hover:text-[#F4EFE6]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back to site
        </Link>

        <p className="mt-12 text-xs uppercase tracking-[0.2em] text-[#F4EFE6]">Legal</p>

        <h1 className="mt-4 font-serif text-4xl font-light tracking-tight text-[#F4EFE6] md:text-5xl">
          Terms of Service
        </h1>

        <p className="mt-4 text-sm text-[#8D806E]">Last updated: January 2025</p>

        <div className="mt-14 space-y-10">
          {SECTIONS.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-light tracking-tight text-[#F4EFE6]">
                {section.heading}
              </h2>
              <p className="mt-3 text-base text-[#C9BCA8] md:text-lg">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
