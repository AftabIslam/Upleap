import type { ApplicationDraft } from './types'

export interface FieldErrors {
  name?: string
  email?: string
  city?: string
  phone?: string
  years?: string
  whySales?: string
  pitch?: string
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateDraft(draft: ApplicationDraft): FieldErrors {
  const errors: FieldErrors = {}
  if (draft.name.trim().length < 2) errors.name = 'Tell us your name.'
  if (!EMAIL.test(draft.email.trim())) errors.email = 'Use a real email so we can reply.'
  if (draft.city.trim().length < 2) errors.city = 'Where are you based?'
  if (draft.phone.trim() && draft.phone.trim().length < 7) errors.phone = 'That phone number looks short.'
  if (!Number.isFinite(draft.years) || draft.years < 0 || draft.years > 60) {
    errors.years = 'Years should be between 0 and 60.'
  }
  if (draft.whySales.trim().length < 40) errors.whySales = 'Give us a few sentences. Forty characters is the floor.'
  if (draft.pitch.trim().length < 40) errors.pitch = 'Pitch the role in a few real sentences.'
  if (draft.energy < 1 || draft.energy > 5) errors.whySales = errors.whySales ?? 'Pick how you feel about outreach.'
  return errors
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0
}
