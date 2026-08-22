'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { submitContact } from '@/app/actions'
import AnimatedSubmit from './ui/AnimatedSubmit'
import AnimatedButton from './ui/AnimatedButton'

const TEAM = [
  {
    name: 'Zubair Ahmed',
    role: 'Chief Executive Officer',
    label: 'CEO',
    email: 'utopiandesignstuido7@gmail.com',
    initials: 'ZA',
    bio: 'Leads client strategy, studio direction and high-value residential commissions.',
  },
  {
    name: 'Rasheed Ahmad',
    role: 'Design Director',
    label: 'Director',
    email: 'rasheedahmad@gmail.com',
    initials: 'RA',
    bio: 'Leads concept design, architectural language and project quality control.',
  },
  {
    name: 'Zeeshan Haider',
    role: 'Senior 3D Visualizer',
    label: '3D Team',
    email: 'utopiandesignstuido7@gmail.com',
    initials: 'ZH',
    bio: 'Builds interactive models, daylight studies and cinematic presentation visuals.',
  },
  {
    name: 'Ahmad Latif',
    role: 'Project Architect',
    label: 'Projects',
    email: 'utopiandesignstuido7@gmail.com',
    initials: 'AL',
    bio: 'Coordinates technical drawings, consultant information and delivery documentation.',
  },
]

const PROJECT_TYPES = [
  'Residential Architecture',
  'Commercial & Civic',
  'Hospitality',
  'Interior Architecture',
  'Planning',
  'Renovation',
  'Development',
  'Turnkey Execution',
  '3D Vision & Massing',
]

const BUDGETS = ['To be discussed', 'Under $500k', '$500k — $2M', '$2M — $10M', '$10M+']
const TIMELINES = ['Exploring', 'Within 6 months', '6 — 12 months', 'Already on site']

const INITIAL = {
  name: '',
  email: '',
  phone: '',
  type: 'Residential Architecture',
  budget: 'To be discussed',
  timeline: 'Within 6 months',
  location: '',
  area: '',
  message: '',
}

const EASE = [0.22, 1, 0.36, 1]

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setStatus('submitting')
    setError('')

    const fd = new FormData()
    Object.entries(form).forEach(([key, value]) => fd.append(key, value))
    fd.append('website', '')

    try {
      const result = await submitContact(fd)

      if (result && result.success) {
        setStatus('success')
        setForm(INITIAL)
      } else {
        setStatus('error')
        setError((result && result.error) || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setStatus('error')
      setError('Network error. Please try again.')
    }
  }

  const inputClass =
    'mt-3 h-12 w-full border border-[#C9BCA8] bg-[#F4EFE6] px-4 text-[#080808] transition-colors duration-500 ease-out placeholder:text-[#8D806E] focus:border-[#B59A67] focus:bg-white focus:outline-none'

  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-[#F4EFE6] py-24 text-[#080808] md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-[#B59A67]">Contact the Studio</p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#080808] md:text-5xl">
              Speak directly with the people
              <span className="text-[#8D806E]"> shaping the work.</span>
            </h2>
          </div>

          <p className="max-w-sm text-base text-[#111111]/75 md:text-lg">
            Choose the right contact or send a project brief. No account needed.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member, index) => (
            <motion.article
              key={`${member.name}-${member.email}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
              className="group overflow-hidden border border-[#C9BCA8] bg-[#E8DDCC] transition-colors duration-500 ease-out hover:border-[#B59A67]"
            >
              <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-gradient-to-br from-[#080808] via-[#171717] to-[#8D806E]">
                <div className="absolute left-5 top-5 border border-[#F4EFE6]/30 bg-[#F4EFE6]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#F4EFE6]">
                  {member.label}
                </div>

                <div className="flex h-28 w-28 items-center justify-center border border-[#F4EFE6]/30 bg-[#F4EFE6]/10 font-serif text-4xl font-light tracking-tight text-[#F4EFE6]">
                  {member.initials}
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#080808]/95 to-transparent p-5">
                  <h3 className="font-serif text-2xl font-light tracking-tight text-[#F4EFE6]">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#C9BCA8]">
                    {member.role}
                  </p>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm leading-relaxed text-[#111111]/75">{member.bio}</p>

                <a
                  href={`mailto:${member.email}`}
                  className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#8D806E] transition-colors duration-500 hover:text-[#080808]"
                >
                  <MailIcon />
                  Email
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-20 grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[#B59A67]">Project Brief</p>
            <h3 className="mt-4 font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#080808] md:text-5xl">
              Send your site, ambition and timeline.
            </h3>
            <p className="mt-6 max-w-md text-base text-[#111111]/75 md:text-lg">
              The studio reviews every enquiry. If the project is a good fit, we reply within two
              working days with next steps.
            </p>

            <div className="mt-10 space-y-5 border-t border-[#C9BCA8] pt-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#B59A67]">Studio Email</p>
                <a
                  href="mailto:utopiandesignstuido7@gmail.com"
                  className="mt-2 block text-[#080808] transition-colors duration-500 hover:text-[#8D806E]"
                >
                  utopiandesignstuido7@gmail.com
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#B59A67]">Telephone</p>
                <a
                  href="tel:+923013918872"
                  className="mt-2 block text-[#080808] transition-colors duration-500 hover:text-[#8D806E]"
                >
                  +92 301 3918872
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#B59A67]">Studio</p>
                <p className="mt-2 text-[#080808]">7CC, DHA Phase 4 · Lahore</p>
                <p className="text-sm text-[#111111]/65">Visits by appointment only</p>
              </div>
            </div>
          </div>

          <div className="border border-[#C9BCA8] bg-[#E8DDCC] p-6 md:col-span-7 md:p-10">
            {status === 'success' ? (
              <div className="flex min-h-[480px] flex-col justify-center">
                <span className="inline-flex h-12 w-12 items-center justify-center border border-[#B59A67] text-[#080808]">
                  <CheckIcon />
                </span>
                <p className="mt-8 text-xs uppercase tracking-[0.2em] text-[#B59A67]">Received</p>
                <h3 className="mt-4 font-serif text-3xl font-light tracking-tight text-[#080808]">
                  Your brief is with the studio.
                </h3>
                <p className="mt-4 max-w-md text-base text-[#111111]/75 md:text-lg">
                  Thank you. We will write back within two working days.
                </p>
                <div className="mt-10">
                  <AnimatedButton variant="plum" showArrow={false} onClick={() => setStatus('idle')}>
                    Send another brief
                  </AnimatedButton>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    ['name', 'Name', 'text', 'Your name'],
                    ['email', 'Email', 'email', 'you@company.com'],
                    ['phone', 'Phone', 'tel', '+92 300 0000000'],
                    ['location', 'Site location', 'text', 'City, area'],
                    ['area', 'Approx. area', 'text', 'e.g. 10 marla / 1 kanal'],
                  ].map(([name, label, type, placeholder]) => (
                    <div key={name}>
                      <label
                        htmlFor={name}
                        className="text-xs uppercase tracking-[0.2em] text-[#8D806E]"
                      >
                        {label}
                      </label>
                      <input
                        id={name}
                        name={name}
                        type={type}
                        autoComplete={name === 'email' ? 'email' : name === 'name' ? 'name' : name === 'phone' ? 'tel' : undefined}
                        value={form[name]}
                        onChange={onChange}
                        required={name === 'name' || name === 'email' || name === 'location'}
                        className={inputClass}
                        placeholder={placeholder}
                      />
                    </div>
                  ))}

                  <div>
                    <label htmlFor="type" className="text-xs uppercase tracking-[0.2em] text-[#8D806E]">
                      Project type
                    </label>
                    <select id="type" name="type" value={form.type} onChange={onChange} className={inputClass}>
                      {PROJECT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget" className="text-xs uppercase tracking-[0.2em] text-[#8D806E]">
                      Budget
                    </label>
                    <select id="budget" name="budget" value={form.budget} onChange={onChange} className={inputClass}>
                      {BUDGETS.map((budget) => (
                        <option key={budget} value={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="text-xs uppercase tracking-[0.2em] text-[#8D806E]">
                      Timeline
                    </label>
                    <select id="timeline" name="timeline" value={form.timeline} onChange={onChange} className={inputClass}>
                      {TIMELINES.map((timeline) => (
                        <option key={timeline} value={timeline}>
                          {timeline}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="text-xs uppercase tracking-[0.2em] text-[#8D806E]">
                    Brief
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={onChange}
                    required
                    className="mt-3 w-full border border-[#C9BCA8] bg-[#F4EFE6] px-4 py-3 text-[#080808] transition-colors duration-500 ease-out placeholder:text-[#8D806E] focus:border-[#B59A67] focus:bg-white focus:outline-none"
                    placeholder="Project type, site, scope, design goals and timeline."
                  />
                </div>

                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                {error ? (
                  <p className="text-sm text-[#111111]" role="alert" aria-live="polite">
                    {error}
                  </p>
                ) : null}

                <AnimatedSubmit loading={status === 'submitting'} loadingText="Sending brief" variant="plum">
                  Send the brief
                </AnimatedSubmit>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}