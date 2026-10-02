export const STAGES = ['applied', 'screen', 'interview', 'offer', 'hired', 'declined'] as const

export type Stage = (typeof STAGES)[number]

export type QuotaComfort = 'ready' | 'building' | 'unsure'

export interface Role {
  slug: string
  title: string
  team: string
  location: string
  comp: string
  quota: string
  summary: string
  day: string[]
  thrives: string[]
}

export interface Application {
  id: string
  roleSlug: string
  name: string
  email: string
  phone: string
  city: string
  years: number
  energy: number
  quota: QuotaComfort
  whySales: string
  pitch: string
  stage: Stage
  note: string
  createdAt: string
}

export type ApplicationDraft = Omit<Application, 'id' | 'stage' | 'note' | 'createdAt'>
