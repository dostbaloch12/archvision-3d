import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name is too short').max(80),
  email: z.string().trim().email('Enter a valid email').max(120),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  type: z.string().trim().max(80).optional().or(z.literal('')),
  budget: z.string().trim().max(80).optional().or(z.literal('')),
  timeline: z.string().trim().max(80).optional().or(z.literal('')),
  location: z.string().trim().min(2, 'Location required').max(120),
  area: z.string().trim().max(40).optional().or(z.literal('')),
  message: z.string().trim().min(10, 'Please write a short brief').max(2000),
})