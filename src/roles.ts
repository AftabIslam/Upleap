import type { Role } from './types'

export const roles: Role[] = [
  {
    slug: 'outbound-sdr',
    title: 'Outbound SDR',
    team: 'New business',
    location: 'Remote · US hours',
    comp: '$58–72k base + uncapped commission',
    quota: '12 qualified meetings a month',
    summary:
      'You open doors that were shut this morning. Calls, tight notes, and a calendar that fills because you sound like a person.',
    day: [
      'A researched list, not a blast.',
      'Live conversations before lunch.',
      'Hand-offs an AE is glad to take.',
    ],
    thrives: [
      'Gets energy from the first no.',
      'Writes the way they talk.',
      'Keeps score without being asked.',
    ],
  },
  {
    slug: 'mid-market-ae',
    title: 'Mid-Market Account Executive',
    team: 'New business',
    location: 'Remote · US hours',
    comp: '$110–140k OTE, split 50/50',
    quota: '$520k new ARR',
    summary:
      'You run the whole conversation, from the first sharp question to a signature the buyer does not regret.',
    day: [
      'Discovery that finds the real problem.',
      'A mutual plan, not a deck tour.',
      'A forecast you would bet on.',
    ],
    thrives: [
      'Likes owning a number.',
      'Can tell a story without slides.',
      'Closes cleanly and follows through.',
    ],
  },
  {
    slug: 'enterprise-ae',
    title: 'Enterprise Account Executive',
    team: 'Enterprise',
    location: 'New York or remote',
    comp: '$180–230k OTE',
    quota: '$1.1M new ARR',
    summary:
      'Longer cycles, more people in the room, same standard: you make the buying group want to move.',
    day: [
      'Multi-thread the account on purpose.',
      'Executive conversations with a point of view.',
      'A close plan everyone can see.',
    ],
    thrives: [
      'Comfortable in a quiet room.',
      'Patient without going passive.',
      'Treats procurement as part of the sale.',
    ],
  },
  {
    slug: 'sales-coach',
    title: 'Player-Coach',
    team: 'Revenue',
    location: 'Remote · US hours',
    comp: '$140–170k OTE',
    quota: 'Team attainment plus a personal number',
    summary:
      'You still sell, and you make the people around you sharper. Coaching here is a craft, not a promotion out of the work.',
    day: [
      'Call reviews that change the next call.',
      'A pipeline conversation with teeth.',
      'Your own deals, still moving.',
    ],
    thrives: [
      'Gives notes people want to hear again.',
      'Protects standards without theatrics.',
      'Still loves a live deal.',
    ],
  },
]

export function roleBySlug(slug: string | undefined): Role | undefined {
  return roles.find((role) => role.slug === slug)
}
