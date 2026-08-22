'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { submitContact } from '@/app/actions'
import AnimatedSubmit from './ui/AnimatedSubmit'
import AnimatedButton from './ui/AnimatedButton'

const TEAM = [
  {
    name: 'Elena Voss',
    role: 'Chief Executive Officer',
    label: 'CEO',
    email: 'elena@archvision3d.com',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
    alt: 'Portrait of Elena Voss, CEO of ArchVision 3D',
    bio: 'Leads client strategy, studio direction and high-value residential commissions.',
  },
  {
    name: 'Marcus Hale',
    role: 'Design Director',
    label: 'Director',
    email: 'marcus@archvision3d.com',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
    alt: 'Portrait of Marcus Hale, Design Director of ArchVision 3D',
    bio: 'Oversees concept design, architectural language and project quality control.',
  },
  {
    name: 'Priya Nandan',
    role: 'Senior 3D Visualizer',
    label: '3D Team',
    email: 'priya@archvision3d.com',
    image:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80',
    alt: 'Portrait of Priya Nandan, Senior 3D Visualizer',
    bio: 'Builds interactive models, daylight studies and cinematic presentation visuals.',
  },
  {
    name: 'Daniel Reyes',
    role: 'Project Architect',
    label: 'Projects',
    email: 'daniel@archvision3d.com',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
    alt: 'Portrait of Daniel Reyes, Project Architect',
    bio: 'Coordinates technical drawings, consultant information and delivery documentation.',
  },
]

const PROJECT_TYPES = [
  'Residential Architecture',
  'Commercial & Civic',
  'Interior Architecture',
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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
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
    'mt-3 h-12 w-full border border-[#1E1230]/20 bg-white/70 px-4 text-[#1E1230] transition-colors duration-500 ease-out placeholder:text-[#2E1A47]/40 focus:border-[#4E3A85] focus:bg-white focus:outline-none'

  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-gradient-to-b from-[#D2A2C8] to-[#EAAFCB] py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-[#3D2B6B]">Contact the Studio</p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#1E1230] md:text-5xl">
              Speak directly with the people
              <span className="text-[#4E3A85]"> shaping the work.</span>
            </h2>
          </div>

          <p className="max-w-sm text-base text-[#2E1A47]/75 md:text-lg">
            Choose the right contact or send a project brief. No account needed.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member, index) => (
            <motion.article
              key={member.email}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
              className="group overflow-hidden border border-[#1E1230]/15 bg-white/35 transition-colors duration-500 ease-out hover:border-[#4E3A85]/50"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1230]/80 via-transparent to-transparent" />

                <div className="absolute left-5 top-5 border border-white/30 bg-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white">
                  {member.label}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-serif text-2xl font-light tracking-tight text-white">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#F6DCE8]">
                    {member.role}
                  </p>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm text-[#2E1A47]/75">{member.bio}</p>

                <a
                  href={`mailto:${member.email}`}
                  className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#3D2B6B] transition-colors duration-500 hover:text-[#1E1230]"
                >
                  <MailIcon />
                  Email
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-20 grid gap-14 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="md:col-span-5"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[#3D2B6B]">Project Brief</p>
            <h3 className="mt-4 font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#1E1230] md:text-5xl">
              Send your site, ambition and timeline.
            </h3>
            <p className="mt-6 max-w-md text-base text-[#2E1A47]/75 md:text-lg">
              The studio reviews every enquiry. If the project is a good fit, we reply within two
              working days with next steps.
            </p>

            <div className="mt-10 space-y-5 border-t border-[#1E1230]/20 pt-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#3D2B6B]">Studio Email</p>
                <a
                  href="mailto:studio@archvision3d.com"
                  className="mt-2 block text-[#1E1230] transition-colors duration-500 hover:text-[#4E3A85]"
                >
                  studio@archvision3d.com
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#3D2B6B]">Telephone</p>
                <a
                  href="tel:+13105550190"
                  className="mt-2 block text-[#1E1230] transition-colors duration-500 hover:text-[#4E3A85]"
                >
                  +1 310 555 0190
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#3D2B6B]">Studios</p>
                <p className="mt-2 text-[#1E1230]">Los Angeles · Dubai</p>
                <p className="text-sm text-[#2E1A47]/70">Visits by appointment only</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="border border-[#1E1230]/15 bg-white/40 p-6 md:col-span-7 md:p-10"
          >
            {status === 'success' ? (
              <div className="flex min-h-[480px] flex-col justify-center">
                <span className="inline-flex h-12 w-12 items-center justify-center border border-[#4E3A85] text-[#4E3A85]">
                  <CheckIcon />
                </span>
                <p className="mt-8 text-xs uppercase tracking-[0.2em] text-[#3D2B6B]">Received</p>
                <h3 className="mt-4 font-serif text-3xl font-light tracking-tight text-[#1E1230]">
                  Your brief is with the studio.
                </h3>
                <p className="mt-4 max-w-md text-base text-[#2E1A47]/75 md:text-lg">
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
                  <div>
                    <label
                      htmlFor="name"
                      className="text-xs uppercase tracking-[0.2em] text-[#3D2B6B]"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={onChange}
                      required
                      className={inputClass}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-xs uppercase tracking-[0.2em] text-[#3D2B6B]"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={onChange}
                      required
                      className={inputClass}
                      placeholder="you@company.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="text-xs uppercase tracking-[0.2em] text-[#3D2B6B]"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={onChange}
                      className={inputClass}
                      placeholder="+1 000 000 0000"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="location"
                      className="text-xs uppercase tracking-[0.2em] text-[#3D2B6B]"
                    >
                      Site location
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={form.location}
                      onChange={onChange}
                      required
                      className={inputClass}
                      placeholder="City, country"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="type"
                      className="text-xs uppercase tracking-[0.2em] text-[#3D2B6B]"
                    >
                      Project type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={form.type}
                      onChange={onChange}
                      className={inputClass}
                    >
                      {PROJECT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="budget"
                      className="text-xs uppercase tracking-[0.2em] text-[#3D2B6B]"
                    >
                      Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={form.budget}
                      onChange={onChange}
                      className={inputClass}
                    >
                      {BUDGETS.map((budget) => (
                        <option key={budget} value={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="timeline"
                      className="text-xs uppercase tracking-[0.2em] text-[#3D2B6B]"
                    >
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={form.timeline}
                      onChange={onChange}
                      className={inputClass}
                    >
                      {TIMELINES.map((timeline) => (
                        <option key={timeline} value={timeline}>
                          {timeline}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="area"
                      className="text-xs uppercase tracking-[0.2em] text-[#3D2B6B]"
                    >
                      Approx. area
                    </label>
                    <input
                      id="area"
                      name="area"
                      type="text"
                      value={form.area}
                      onChange={onChange}
                      className={inputClass}
                      placeholder="e.g. 850 m²"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="text-xs uppercase tracking-[0.2em] text-[#3D2B6B]"
                  >
                    Brief
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={onChange}
                    required
                    className="mt-3 w-full border border-[#1E1230]/20 bg-white/70 px-4 py-3 text-[#1E1230] transition-colors duration-500 ease-out placeholder:text-[#2E1A47]/40 focus:border-[#4E3A85] focus:bg-white focus:outline-none"
                    placeholder="Programme, ambitions, constraints — whatever is already known."
                  />
                </div>

                <input
                  type="text"
                  name="website"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {error ? (
                  <p className="text-sm text-[#2E1A47]" role="alert" aria-live="polite">
                    {error}
                  </p>
                ) : null}

                <AnimatedSubmit
                  loading={status === 'submitting'}
                  loadingText="Sending brief"
                  variant="plum"
                >
                  Send the brief
                </AnimatedSubmit>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}