import type { Application, QuotaComfort } from './types'

export interface Enthusiasm {
  score: number
  label: 'All in' | 'Fired up' | 'Promising' | 'Lukewarm'
}

const QUOTA_POINTS: Record<QuotaComfort, number> = {
  ready: 10,
  building: 6,
  unsure: 0,
}

export function enthusiasmOf(application: Pick<Application, 'whySales' | 'pitch' | 'energy' | 'quota' | 'years'>): Enthusiasm {
  let score = 36
  const why = application.whySales.trim().length
  const pitch = application.pitch.trim().length

  if (why >= 80) score += 12
  if (why >= 180) score += 8
  if (pitch >= 80) score += 12
  if (pitch >= 180) score += 8

  const energy = Math.min(5, Math.max(1, application.energy))
  score += energy * 4
  score += QUOTA_POINTS[application.quota]
  if (application.years >= 1) score += 4
  if (application.years >= 4) score += 2

  score = Math.max(0, Math.min(100, score))

  const label = score >= 88 ? 'All in' : score >= 74 ? 'Fired up' : score >= 58 ? 'Promising' : 'Lukewarm'
  return { score, label }
}

export function firstName(name: string): string {
  const trimmed = name.trim()
  if (!trimmed) return 'them'
  return trimmed.split(/\s+/)[0] ?? trimmed
}
