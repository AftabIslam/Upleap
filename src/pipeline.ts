import type { Stage } from './types'

export const BOARD_STAGES: Stage[] = ['applied', 'screen', 'interview', 'offer', 'hired']

export const STAGE_LABEL: Record<Stage, string> = {
  applied: 'Applied',
  screen: 'Screen',
  interview: 'Interview',
  offer: 'Offer',
  hired: 'Hired',
  declined: 'Declined',
}

const ORDER: Stage[] = ['applied', 'screen', 'interview', 'offer', 'hired']

export function nextStage(stage: Stage): Stage | null {
  if (stage === 'declined' || stage === 'hired') return null
  const index = ORDER.indexOf(stage)
  if (index < 0) return null
  return ORDER[index + 1] ?? null
}

export function prevStage(stage: Stage): Stage | null {
  if (stage === 'declined') return 'applied'
  const index = ORDER.indexOf(stage)
  if (index <= 0) return null
  return ORDER[index - 1] ?? null
}

export function stageActionLabel(stage: Stage, firstName: string): string | null {
  const upcoming = nextStage(stage)
  if (!upcoming) return null
  if (upcoming === 'hired') return `Hire ${firstName}`
  return `Advance to ${STAGE_LABEL[upcoming]}`
}
