import { describe, expect, it } from 'vitest'
import { nextStage, prevStage, stageActionLabel } from './pipeline'
import { enthusiasmOf, firstName } from './score'
import { SEED_APPLICATIONS } from './seed'
import { roles } from './roles'
import { hasErrors, validateDraft } from './validate'
import type { ApplicationDraft } from './types'

const rich: ApplicationDraft = {
  roleSlug: 'outbound-sdr',
  name: 'Maya Chen',
  email: 'maya.chen@example.com',
  phone: '415-555-0148',
  city: 'Oakland',
  years: 4,
  energy: 5,
  quota: 'ready',
  whySales: 'x'.repeat(180),
  pitch: 'y'.repeat(180),
}

describe('enthusiasmOf', () => {
  it('scores a full pitch, quota comfort, and outreach appetite at the top', () => {
    expect(enthusiasmOf(rich)).toEqual({ score: 100, label: 'All in' })
  })

  it('stays lukewarm when the writing is thin and quota comfort is unsure', () => {
    const result = enthusiasmOf({
      ...rich,
      years: 0,
      energy: 1,
      quota: 'unsure',
      whySales: 'x'.repeat(40),
      pitch: 'y'.repeat(40),
    })
    expect(result.score).toBeLessThan(58)
    expect(result.label).toBe('Lukewarm')
  })

  it('clamps energy that falls outside 1 to 5', () => {
    expect(enthusiasmOf({ ...rich, energy: 99 }).score).toBe(100)
  })
})

describe('pipeline', () => {
  it('walks a candidate from applied to hired', () => {
    expect(nextStage('applied')).toBe('screen')
    expect(nextStage('screen')).toBe('interview')
    expect(nextStage('interview')).toBe('offer')
    expect(nextStage('offer')).toBe('hired')
    expect(nextStage('hired')).toBeNull()
    expect(nextStage('declined')).toBeNull()
  })

  it('labels the offer step as a hire', () => {
    expect(stageActionLabel('offer', 'Priya')).toBe('Hire Priya')
    expect(stageActionLabel('hired', 'Priya')).toBeNull()
  })

  it('sends a declined candidate back to applied', () => {
    expect(prevStage('declined')).toBe('applied')
    expect(prevStage('applied')).toBeNull()
  })
})

describe('seed desk', () => {
  it('points every sample applicant at a real role', () => {
    const slugs = new Set(roles.map((role) => role.slug))
    for (const application of SEED_APPLICATIONS) {
      expect(slugs.has(application.roleSlug)).toBe(true)
    }
  })

  it('includes someone already hired', () => {
    expect(SEED_APPLICATIONS.some((application) => application.stage === 'hired')).toBe(true)
  })
})

describe('validateDraft', () => {
  it('accepts a complete enthusiast application', () => {
    expect(hasErrors(validateDraft(rich))).toBe(false)
  })

  it('asks for a real pitch and a reachable email', () => {
    const errors = validateDraft({
      ...rich,
      email: 'not-an-email',
      pitch: 'too short',
      whySales: 'also short',
    })
    expect(errors.email).toBeTruthy()
    expect(errors.pitch).toBeTruthy()
    expect(errors.whySales).toBeTruthy()
  })
})

describe('firstName', () => {
  it('uses the first word of a name', () => {
    expect(firstName('Priya Shah')).toBe('Priya')
    expect(firstName('   ')).toBe('them')
  })
})
