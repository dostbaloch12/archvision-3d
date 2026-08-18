'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { submitContact } from '@/app/actions'
import AnimatedSubmit from './ui/AnimatedSubmit'
import AnimatedButton from './ui/AnimatedButton'

const PROJECT_TYPES = [
  'Residential Architecture',
  'Commercial & Civic',
  'Interior Architecture',
  '3D Vision & Massing',
]

const BUDGETS = ['To be discussed', 'Under $500k', '$500k — $2M', '$2M — $10M', '$10M+']
const TIMELINES = ['Exploring', 'Within 6 months', '6 — 12 months', 'Already on site']

const OFFICES = [
  { city: 'Los Angeles', line: '420 Santa Monica Boulevard, Suite 12', region: 'California, USA' },
  { city: 'Dubai', line: 'Gate Avenue, DIFC', region: 'United Arab Emirates' },
]

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

function PinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-1 shrink-0 text-[#4E3A85]"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-1 shrink-0 text-[#4E3A85]"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-1 shrink-0 text-[#4E3A85]"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-1 shrink-0 text-[#4E3A85]"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
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
        <div className="grid gap-16 md:grid-cols-12 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="md:col-span-5"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[#3D2B6B]">Commission</p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#1E1230] md:text-5xl">
              Begin with a
              <span className="text-[#4E3A85]"> private conversation.</span>
            </h2>
            <p className="mt-6 max-w-md text-base text-[#2E1A47]/75 md:text-lg">
              No account needed. Send a written brief — we read every enquiry ourselves and reply
              within two working days.
            </p>

            <div className="mt-12 space-y-8">
              {OFFICES.map((office) => (
                <div key={office.city} className="flex gap-4">
                  <PinIcon />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#3D2B6B]">
                      {office.city}
                    </p>
                    <p className="mt-2 text-[#1E1230]">{office.line}</p>
                    <p className="text-[#2E1A47]/70">{office.region}</p>
                  </div>
                </div>
              ))}

              <div className="flex gap-4">
                <PhoneIcon />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#3D2B6B]">Telephone</p>
                  <a
                    href="tel:+13105550190"
                    className="mt-2 block text-[#1E1230] transition-colors duration-500 hover:text-[#4E3A85]"
                  >
                    +1 310 555 0190
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <MailIcon />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#3D2B6B]">Studio</p>
                  <a
                    href="mailto:studio@archvision3d.com"
                    className="mt-2 block text-[#1E1230] transition-colors duration-500 hover:text-[#4E3A85]"
                  >
                    studio@archvision3d.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <ClockIcon />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#3D2B6B]">Studio hours</p>
                  <p className="mt-2 text-[#1E1230]">Monday — Friday, 09:00 — 18:00</p>
                  <p className="text-[#2E1A47]/70">Visits by appointment only</p>
                </div>
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
                      placeholder="Elena Voss"
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
                      placeholder="you@studio.com"
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