import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { SEED_APPLICATIONS } from './seed'
import type { Application, ApplicationDraft } from './types'

const STORAGE_KEY = 'upleap.applications.v1'

interface StoreValue {
  applications: Application[]
  submit: (draft: ApplicationDraft) => { ok: true; application: Application } | { ok: false; error: string }
  move: (id: string, stage: Application['stage']) => void
  setNote: (id: string, note: string) => void
  reset: () => void
}

const StoreContext = createContext<StoreValue | null>(null)

function readStored(): Application[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return SEED_APPLICATIONS
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return SEED_APPLICATIONS
    return parsed as Application[]
  } catch {
    return SEED_APPLICATIONS
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState<Application[]>(readStored)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
  }, [applications])

  const value = useMemo<StoreValue>(() => {
    return {
      applications,
      submit(draft) {
        const email = draft.email.trim().toLowerCase()
        const duplicate = applications.some(
          (application) =>
            application.roleSlug === draft.roleSlug && application.email.trim().toLowerCase() === email,
        )
        if (duplicate) {
          return { ok: false, error: 'You already applied for this role with that email.' }
        }
        const application: Application = {
          ...draft,
          name: draft.name.trim(),
          email: draft.email.trim(),
          phone: draft.phone.trim(),
          city: draft.city.trim(),
          whySales: draft.whySales.trim(),
          pitch: draft.pitch.trim(),
          id: crypto.randomUUID(),
          stage: 'applied',
          note: '',
          createdAt: new Date().toISOString(),
        }
        setApplications((current) => [application, ...current])
        return { ok: true, application }
      },
      move(id, stage) {
        setApplications((current) =>
          current.map((application) => (application.id === id ? { ...application, stage } : application)),
        )
      },
      setNote(id, note) {
        setApplications((current) =>
          current.map((application) => (application.id === id ? { ...application, note } : application)),
        )
      },
      reset() {
        setApplications(SEED_APPLICATIONS)
      },
    }
  }, [applications])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreValue {
  const value = useContext(StoreContext)
  if (!value) throw new Error('useStore must be used inside StoreProvider')
  return value
}
