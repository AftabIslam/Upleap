import type { Application } from './types'

export const SEED_APPLICATIONS: Application[] = [
  {
    id: 'seed-maya-chen',
    roleSlug: 'outbound-sdr',
    name: 'Maya Chen',
    email: 'maya.chen@example.com',
    phone: '415-555-0148',
    city: 'Oakland',
    years: 2,
    energy: 5,
    quota: 'ready',
    whySales:
      'I like the moment a stranger decides to keep talking. Last quarter I rebuilt our opener after listening to thirty lost calls, and my connect-to-meeting rate jumped because the first sentence finally sounded like help instead of a script.',
    pitch:
      'Upleap hires people who want the number. If your team is tired of polite candidates who go quiet when the dial starts, I am the person who treats a no as information and still books the meeting.',
    stage: 'applied',
    note: '',
    createdAt: '2026-09-28T15:10:00.000Z',
  },
  {
    id: 'seed-jordan-hale',
    roleSlug: 'mid-market-ae',
    name: 'Jordan Hale',
    email: 'jordan.hale@example.com',
    phone: '312-555-0190',
    city: 'Chicago',
    years: 5,
    energy: 4,
    quota: 'ready',
    whySales:
      'I stayed in sales after a year that missed plan because the work still felt like mine. I like building a case the buyer can repeat upstairs, then asking for the decision while the room is still honest.',
    pitch:
      'Upleap should hire me to run mid-market deals that do not stall in polite follow-up. I will find the real problem, write the mutual plan, and close without making procurement the villain.',
    stage: 'interview',
    note: 'Strong discovery story. Ask them to run a live pricing conversation.',
    createdAt: '2026-09-22T18:04:00.000Z',
  },
  {
    id: 'seed-priya-shah',
    roleSlug: 'enterprise-ae',
    name: 'Priya Shah',
    email: 'priya.shah@example.com',
    phone: '646-555-0172',
    city: 'Brooklyn',
    years: 8,
    energy: 4,
    quota: 'ready',
    whySales:
      'Enterprise is a group sport and I like being the person who keeps it moving. I have closed seven-figure cycles by making the executive buyer, the operator, and security feel like they were on the same plan.',
    pitch:
      'Hire me when the room gets quiet and expensive. I will multi-thread the account, tell the truth about timeline, and bring a close plan the champion can forward without rewriting.',
    stage: 'offer',
    note: 'Offer drafted at the top of band. Waiting on their start date.',
    createdAt: '2026-09-18T13:30:00.000Z',
  },
  {
    id: 'seed-alex-rivera',
    roleSlug: 'outbound-sdr',
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    phone: '206-555-0114',
    city: 'Seattle',
    years: 0,
    energy: 5,
    quota: 'building',
    whySales:
      'I have not carried a formal quota yet. I ran outreach for a student fundraiser and found I liked the live calls more than the planning meetings. I want a desk where someone will tell me what good sounds like.',
    pitch:
      'I am new and loud about it. Give me a list, a standard, and a coach who reviews calls. I will outwork the first month and bring you notes on what the market is actually saying.',
    stage: 'screen',
    note: 'Screen for coachability. Energy is real.',
    createdAt: '2026-09-30T16:45:00.000Z',
  },
  {
    id: 'seed-sam-okonkwo',
    roleSlug: 'sales-coach',
    name: 'Sam Okonkwo',
    email: 'sam.okonkwo@example.com',
    phone: '512-555-0166',
    city: 'Austin',
    years: 9,
    energy: 3,
    quota: 'ready',
    whySales:
      'The part I never got tired of is the call review where someone hears themselves and changes the next sentence. I still carry deals because coaching goes stale when you leave the floor.',
    pitch:
      'Upleap gets a player-coach who will protect the standard and still hit a personal number. I review calls in public, keep the notes specific, and hire only people who want the work.',
    stage: 'hired',
    note: 'Signed. Starts the second Monday.',
    createdAt: '2026-09-12T11:00:00.000Z',
  },
]
