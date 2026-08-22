import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy',
  description: 'How ArchVision 3D collects, uses and protects your data.',
}

const SECTIONS = [
  {
    heading: 'Information we collect',
    body: 'When you submit our contact form, we collect your name, email, phone number, project type, budget range, timeline, site location, approximate area and your written brief. If you subscribe to our journal, we store only your email address.',
  },
  {
    heading: 'How we use it',
    body: 'Your information is used only to respond to your enquiry, prepare a project conversation and, if you subscribe, send our journal. We do not sell, rent or trade your data.',
  },
  {
    heading: 'Data storage',
    body: 'Enquiry and journal data is stored in a managed PostgreSQL database. Row Level Security is enabled and public read access is disabled.',
  },
  {
    heading: 'Email delivery',
    body: 'We may use a transactional email provider to deliver enquiry notifications and replies. Your email is used only for communication related to your request.',
  },
  {
    heading: 'Retention',
    body: 'Project enquiries are retained for up to 24 months after the last contact unless a project proceeds. Journal subscriptions are retained until you unsubscribe or request deletion.',
  },
  {
    heading: 'Your rights',
    body: 'You may request access to, correction of, or deletion of your data at any time by emailing studio@archvision3d.com.',
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#44433f] to-[#c8c4bc] py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 md:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#77736b] transition-colors duration-500 hover:text-[#44433f]"
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

        <p className="mt-12 text-xs uppercase tracking-[0.2em] text-[#44433f]">Legal</p>

        <h1 className="mt-4 font-serif text-4xl font-light tracking-tight text-[#44433f] md:text-5xl">
          Privacy Policy
        </h1>

        <p className="mt-4 text-sm text-[#77736b]">Last updated: January 2025</p>

        <div className="mt-14 space-y-10">
          {SECTIONS.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-light tracking-tight text-[#44433f]">
                {section.heading}
              </h2>
              <p className="mt-3 text-base text-[#77736b] md:text-lg">{section.body}</p>
            </section>
          ))}

          <section className="border-t border-[#c8c4bc] pt-10">
            <h2 className="text-xl font-light tracking-tight text-[#44433f]">Contact</h2>
            <p className="mt-3 text-base text-[#77736b] md:text-lg">
              For privacy requests, write to{' '}
              <a
                href="mailto:studio@archvision3d.com"
                className="text-[#44433f] transition-colors duration-500 hover:text-[#FFF8EC]"
              >
                studio@archvision3d.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
