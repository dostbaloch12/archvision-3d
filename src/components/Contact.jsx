'use client'

import { useState } from 'react'
import { submitContact } from '@/app/actions'

const PEOPLE = [
  {
    name: 'Zubair Ahmed',
    role: 'Chief Executive Officer',
    copy: 'Leads client strategy, studio direction and high-value residential commissions.',
  },
  {
    name: 'Rasheed Ahmad',
    role: 'Design Director',
    copy: 'Concept design, architectural language and project quality control.',
    email: 'ar.rasheedahmad@gmail.com',
  },
  {
    name: 'Ahmad Latif',
    role: 'Project Architect · Projects',
    copy: 'Coordinates technical drawings, consultant information and delivery documentation.',
  },
  {
    name: 'Zeeshan Haider',
    role: 'Senior 3D Visualizer · 3D Team',
    copy: 'Builds interactive models, daylight studies and cinematic presentation visuals.',
  },
]

const PROJECT_TYPES = [
  'Residential Architecture',
  'Commercial & Civic',
  'Interior Architecture',
  '3D Vision & Massing',
  'Hospitality',
  'Institutional',
  'Mixed-Use',
]

const BUDGETS = ['To be discussed', 'Under $500k', '$500k — $2M', '$2M — $10M', '$10M+']

const TIMELINES = ['Exploring', 'Within 6 months', '6 — 12 months', 'Already on site']

const INITIAL = {
  name: '',
  email: '',
  phone: '',
  location: '',
  type: 'Residential Architecture',
  budget: 'To be discussed',
  timeline: 'Exploring',
  area: '',
  message: '',
}

function EmptyAvatar() {
  return (
    <div
      className="relative flex h-[56px] w-[56px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#3a3a36]"
      aria-hidden="true"
    >
      <div className="absolute top-[11px] h-[17px] w-[17px] rounded-full bg-[#73736c]" />
      <div className="absolute bottom-[-8px] h-[34px] w-[38px] rounded-t-full bg-[#73736c]" />
      <div className="absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]" />
    </div>
  )
}

function withTimeout(promise, ms = 15000) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      window.setTimeout(() => reject(new Error('Request timeout. Please try again.')), ms)
    }),
  ])
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')

    if (status === 'error') {
      setStatus('idle')
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setStatus('submitting')
    setError('')

    const fd = new FormData()
    Object.entries(form).forEach(([key, value]) => fd.append(key, value))
    fd.append('website', '')

    try {
      const result = await withTimeout(submitContact(fd), 15000)

      if (result?.success) {
        setStatus('success')
        setForm(INITIAL)
        return
      }

      setStatus('error')
      setError(result?.error || 'Could not send. Please try again.')
    } catch (err) {
      setStatus('error')
      setError(err?.message || 'Network error. Please try again.')
    }
  }

  const field =
    'border-0 border-b border-[#4a4a45] bg-transparent py-3 text-[13px] text-white outline-none placeholder:text-[#888]'

  return (
    <section id="contact" className="scroll-mt-[92px] bg-[#191917] text-white">
      <div className="site-container grid gap-10 py-14 md:grid-cols-[0.9fr_1.1fr] md:items-start md:py-16">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.17em] !text-[#888]">
            06 — Contact
          </div>

          <h2 className="mt-4 max-w-[560px] font-[var(--font-manrope)] text-[clamp(48px,5.4vw,74px)] font-medium leading-[0.96] tracking-[-0.06em] !text-white">
            Contact the Studio
          </h2>

          <p className="mt-6 max-w-[440px] text-[15px] leading-[1.75] !text-[#aaa]">
            Speak directly with the people shaping the work. Choose the right contact or send a
            project brief. No account needed.
          </p>

          <div className="mt-10">
            {PEOPLE.map((person) => (
              <div
                key={person.name}
                className="grid grid-cols-[66px_1fr] gap-4 border-t border-[#3a3a36] py-3"
              >
                <EmptyAvatar />

                <div>
                  <h3 className="font-[var(--font-manrope)] text-[19px] font-medium tracking-[-0.035em] !text-white">
                    {person.name}
                  </h3>

                  <div className="mt-[5px] text-[10px] uppercase tracking-[0.12em] !text-[#888]">
                    {person.role}
                  </div>

                  <p className="mt-[6px] text-[12px] leading-[1.55] !text-[#aaa]">
                    {person.copy}
                  </p>

                  {person.email ? (
                    <a
                      href={`mailto:${person.email}`}
                      className="mt-2 inline-block text-[12px] !text-[#ddd] transition-colors duration-300 hover:!text-white"
                    >
                      {person.email} ↗
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#242421] p-6 md:p-8">
          <h3 className="mb-2 font-[var(--font-manrope)] text-[30px] font-medium tracking-[-0.04em] !text-white">
            Project Brief
          </h3>

          <p className="mb-7 text-[13px] !text-[#aaa]">Send your site, ambition and timeline.</p>

          {status === 'success' ? (
            <div className="py-16">
              <h4 className="font-[var(--font-manrope)] text-3xl font-medium tracking-[-0.04em] !text-white">
                Brief received.
              </h4>

              <p className="mt-4 !text-[#aaa]">Thank you. We will reply within two working days.</p>

              <button
                type="button"
                onClick={() => {
                  setStatus('idle')
                  setError('')
                }}
                className="mt-8 bg-white px-[22px] py-4 text-[10px] font-semibold uppercase tracking-[0.12em] !text-[#181816]"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-[0.12em] !text-[#888]">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  className={field}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-[0.12em] !text-[#888]">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  className={field}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-[0.12em] !text-[#888]">Phone</label>
                <input name="phone" value={form.phone} onChange={onChange} className={field} />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-[0.12em] !text-[#888]">
                  Site Location
                </label>
                <input
                  name="location"
                  value={form.location}
                  onChange={onChange}
                  required
                  className={field}
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[9px] uppercase tracking-[0.12em] !text-[#888]">
                  Project Type
                </label>
                <select name="type" value={form.type} onChange={onChange} className={field}>
                  {PROJECT_TYPES.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-[0.12em] !text-[#888]">Budget</label>
                <select name="budget" value={form.budget} onChange={onChange} className={field}>
                  {BUDGETS.map((budget) => (
                    <option key={budget}>{budget}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-[0.12em] !text-[#888]">
                  Timeline
                </label>
                <select
                  name="timeline"
                  value={form.timeline}
                  onChange={onChange}
                  className={field}
                >
                  {TIMELINES.map((timeline) => (
                    <option key={timeline}>{timeline}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[9px] uppercase tracking-[0.12em] !text-[#888]">
                  Approx. Area
                </label>
                <input name="area" value={form.area} onChange={onChange} className={field} />
              </div>

              <div className="md:col-span-2">
                <label className="text-[9px] uppercase tracking-[0.12em] !text-[#888]">
                  Project Brief
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  required
                  placeholder="Tell us about the site, ambition, requirements and anything else we should know."
                  className="mt-2 h-[95px] w-full resize-y border border-[#4a4a45] bg-transparent p-4 text-[13px] text-white outline-none placeholder:text-[#888]"
                />
              </div>

              <input
                type="text"
                name="website"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {error ? (
                <p className="text-sm !text-[#ddd] md:col-span-2" role="alert" aria-live="polite">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="justify-self-start bg-white px-[22px] py-4 text-[10px] font-semibold uppercase tracking-[0.12em] !text-[#181816] disabled:cursor-wait disabled:opacity-70 md:col-span-2"
              >
                {status === 'submitting' ? 'Sending...' : 'Send the brief ↗'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}