'use client'

import { useState } from 'react'
import Image from 'next/image'
import { submitContact } from '@/app/actions'

const PEOPLE = [
  {
    name: 'Zubair Ahmed',
    role: 'Chief Executive Officer',
    copy: 'Leads client strategy, studio direction and high-value residential commissions.',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Rasheed Ahmad',
    role: 'Design Director',
    copy: 'Concept design, architectural language and project quality control.',
    email: 'ar.rasheedahmad@gmail.com',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Ahmad Latif',
    role: 'Project Architect · Projects',
    copy: 'Coordinates technical drawings, consultant information and delivery documentation.',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Zeeshan Haider',
    role: 'Senior 3D Visualizer · 3D Team',
    copy: 'Builds interactive models, daylight studies and cinematic presentation visuals.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
]

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

    const result = await submitContact(fd)

    if (result?.success) {
      setStatus('success')
      setForm(INITIAL)
    } else {
      setStatus('error')
      setError(result?.error || 'Could not send. Please try again.')
    }
  }

  const field =
    'border-0 border-b border-[#4a4a45] bg-transparent py-3 text-[13px] text-white outline-none placeholder:text-[#888]'

  return (
    <section id="contact" className="scroll-mt-[92px] bg-[#191917] text-white">
      <div className="site-container grid gap-12 py-20 md:grid-cols-[0.9fr_1.1fr] md:items-center md:py-24">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#888]">
            06 — Contact
          </div>

          <h2 className="mt-4 max-w-[560px] font-[var(--font-manrope)] text-[clamp(48px,5.4vw,74px)] font-medium leading-[0.96] tracking-[-0.06em]">
            Contact the Studio
          </h2>

          <p className="mt-6 max-w-[440px] text-[15px] leading-[1.75] text-[#aaa]">
            Speak directly with the people shaping the work. Choose the right contact or send a
            project brief. No account needed.
          </p>

          <div className="mt-10">
            {PEOPLE.map((person) => (
              <div
                key={person.name}
                className="grid grid-cols-[74px_1fr] gap-4 border-t border-[#3a3a36] py-4"
              >
                <div className="relative h-[64px] w-[64px] overflow-hidden">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="64px"
                    className="object-cover grayscale"
                  />
                </div>

                <div>
                  <h3 className="font-[var(--font-manrope)] text-[19px] font-medium tracking-[-0.035em]">
                    {person.name}
                  </h3>

                  <div className="mt-[5px] text-[10px] uppercase tracking-[0.12em] text-[#888]">
                    {person.role}
                  </div>

                  <p className="mt-[6px] text-[12px] leading-[1.55] text-[#aaa]">{person.copy}</p>

                  {person.email ? (
                    <a
                      href={`mailto:${person.email}`}
                      className="mt-2 inline-block text-[11px] text-[#ddd] transition-colors duration-300 hover:text-white"
                    >
                      {person.email} ↗
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#242421] p-7 md:p-[38px]">
          <h3 className="mb-2 font-[var(--font-manrope)] text-[30px] font-medium tracking-[-0.04em]">
            Project Brief
          </h3>

          <p className="mb-7 text-[13px] text-[#aaa]">Send your site, ambition and timeline.</p>

          {status === 'success' ? (
            <div className="py-16">
              <h4 className="font-[var(--font-manrope)] text-3xl font-medium tracking-[-0.04em]">
                Brief received.
              </h4>

              <p className="mt-4 text-[#aaa]">Thank you. We will reply within two working days.</p>

              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-8 bg-white px-[22px] py-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#181816]"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-[18px] md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-[0.12em] text-[#888]">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  className={field}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-[0.12em] text-[#888]">Email</label>
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
                <label className="text-[9px] uppercase tracking-[0.12em] text-[#888]">Phone</label>
                <input name="phone" value={form.phone} onChange={onChange} className={field} />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-[0.12em] text-[#888]">
                  Site Location
                </label>
                <input
                  name="location"
                  value={form.location}
                  onChange={onChange}
                  className={field}
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[9px] uppercase tracking-[0.12em] text-[#888]">
                  Project Type
                </label>
                <select name="type" value={form.type} onChange={onChange} className={field}>
                  <option>Residential Architecture</option>
                  <option>Commercial & Civic</option>
                  <option>Interior Architecture</option>
                  <option>3D Vision & Massing</option>
                  <option>Hospitality</option>
                  <option>Institutional</option>
                  <option>Mixed-Use</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-[0.12em] text-[#888]">Budget</label>
                <select name="budget" value={form.budget} onChange={onChange} className={field}>
                  <option>To be discussed</option>
                  <option>Under $500k</option>
                  <option>$500k — $2M</option>
                  <option>$2M — $10M</option>
                  <option>$10M+</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-[0.12em] text-[#888]">
                  Timeline
                </label>
                <select
                  name="timeline"
                  value={form.timeline}
                  onChange={onChange}
                  className={field}
                >
                  <option>Exploring</option>
                  <option>Within 6 months</option>
                  <option>6 — 12 months</option>
                  <option>Already on site</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[9px] uppercase tracking-[0.12em] text-[#888]">
                  Approx. Area
                </label>
                <input name="area" value={form.area} onChange={onChange} className={field} />
              </div>

              <div className="md:col-span-2">
                <label className="text-[9px] uppercase tracking-[0.12em] text-[#888]">
                  Project Brief
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  required
                  placeholder="Tell us about the site, ambition, requirements and anything else we should know."
                  className="mt-2 h-[115px] w-full resize-y border border-[#4a4a45] bg-transparent p-4 text-[13px] text-white outline-none placeholder:text-[#888]"
                />
              </div>

              <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

              {error ? <p className="text-sm text-[#ddd] md:col-span-2">{error}</p> : null}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="justify-self-start bg-white px-[22px] py-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#181816] disabled:opacity-70 md:col-span-2"
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