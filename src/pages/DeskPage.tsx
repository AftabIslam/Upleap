import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BOARD_STAGES, STAGE_LABEL, nextStage, prevStage, stageActionLabel } from '../pipeline'
import { roleBySlug } from '../roles'
import { enthusiasmOf, firstName } from '../score'
import { useStore } from '../store'
import type { Application, Stage } from '../types'

export function DeskPage() {
  const { applications, move, setNote, reset } = useStore()
  const { id } = useParams()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [flash, setFlash] = useState('')
  const [confirming, setConfirming] = useState<'hire' | 'decline' | null>(null)

  const selected = applications.find((application) => application.id === id) ?? null

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return applications.filter((application) => {
      if (roleFilter !== 'all' && application.roleSlug !== roleFilter) return false
      if (!needle) return true
      return (
        application.name.toLowerCase().includes(needle) ||
        application.email.toLowerCase().includes(needle) ||
        application.city.toLowerCase().includes(needle)
      )
    })
  }, [applications, query, roleFilter])

  const declined = visible.filter((application) => application.stage === 'declined')

  useEffect(() => {
    if (!selected) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setConfirming(null)
        navigate('/desk')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected, navigate])
  const roleOptions = Array.from(new Set(applications.map((application) => application.roleSlug)))

  function announce(message: string) {
    setFlash(message)
  }

  function onDropStage(stage: Stage, applicationId: string) {
    const application = applications.find((item) => item.id === applicationId)
    if (!application || application.stage === stage) return
    move(applicationId, stage)
    announce(`${application.name} moved to ${STAGE_LABEL[stage]}.`)
  }

  function open(application: Application) {
    setConfirming(null)
    navigate(`/desk/${application.id}`)
  }

  function closeSheet() {
    setConfirming(null)
    navigate('/desk')
  }

  function advance(application: Application) {
    const upcoming = nextStage(application.stage)
    if (!upcoming) return
    if (upcoming === 'hired') {
      setConfirming('hire')
      return
    }
    move(application.id, upcoming)
    announce(`${application.name} moved to ${STAGE_LABEL[upcoming]}.`)
  }

  function hire(application: Application) {
    move(application.id, 'hired')
    setConfirming(null)
    announce(`${application.name} is hired.`)
  }

  function decline(application: Application) {
    move(application.id, 'declined')
    setConfirming(null)
    announce(`${application.name} was declined.`)
  }

  function back(application: Application) {
    const previous = prevStage(application.stage)
    if (!previous) return
    move(application.id, previous)
    setConfirming(null)
    announce(
      application.stage === 'declined'
        ? `${application.name} is back in Applied.`
        : `${application.name} moved to ${STAGE_LABEL[previous]}.`,
    )
  }

  return (
    <div className={`page desk-page ${selected ? 'desk-open' : ''}`}>
      <div className="desk-main">
      <header className="desk-head">
        <div>
          <p className="eyebrow">Internal</p>
          <h1>Hiring desk</h1>
          <p className="lede slim">
            Read the pitch, move the person, hire them. Drag a card into a column or open it to decide.
          </p>
        </div>
        <div className="desk-tools">
          <label className="search">
            <span className="sr">Search candidates</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name, email, city"
            />
          </label>
          <label className="filter">
            <span className="sr">Filter by role</span>
            <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
              <option value="all">All roles</option>
              {roleOptions.map((slug) => (
                <option key={slug} value={slug}>
                  {roleBySlug(slug)?.title ?? slug}
                </option>
              ))}
            </select>
          </label>
          <button
            className="button ghost"
            type="button"
            onClick={() => {
              reset()
              announce('Sample desk restored.')
              navigate('/desk')
            }}
          >
            Reset sample desk
          </button>
        </div>
      </header>

      <p className="flash" role="status" aria-live="polite">
        {flash}
      </p>

      <div className="board">
        {BOARD_STAGES.map((stage) => {
          const column = visible.filter((application) => application.stage === stage)
          return (
            <section
              key={stage}
              className={`column column-${stage}`}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault()
                const applicationId = event.dataTransfer.getData('text/plain')
                if (applicationId) onDropStage(stage, applicationId)
              }}
            >
              <header>
                <h2>{STAGE_LABEL[stage]}</h2>
                <span>{column.length}</span>
              </header>
              {column.length === 0 && <p className="empty">Nobody here.</p>}
              {column.map((application) => (
                <CandidateCard
                  key={application.id}
                  application={application}
                  selected={application.id === id}
                  onOpen={() => open(application)}
                />
              ))}
            </section>
          )
        })}
      </div>

      <section
        className="declined"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault()
          const applicationId = event.dataTransfer.getData('text/plain')
          if (applicationId) onDropStage('declined', applicationId)
        }}
      >
        <header>
          <h2>Declined</h2>
          <span>{declined.length}</span>
        </header>
        {declined.length === 0 ? (
          <p className="empty">Drop a card here to pass.</p>
        ) : (
          <div className="declined-row">
            {declined.map((application) => (
              <CandidateCard
                key={application.id}
                application={application}
                selected={application.id === id}
                onOpen={() => open(application)}
              />
            ))}
          </div>
        )}
      </section>
      </div>

      {selected && (
        <div className="sheet-backdrop" onClick={closeSheet}>
          <article
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="sheet-top">
              <div>
                <p className="eyebrow">{STAGE_LABEL[selected.stage]}</p>
                <h2 id="sheet-title">{selected.name}</h2>
                <p>
                  {roleBySlug(selected.roleSlug)?.title} · {selected.city}
                </p>
              </div>
              <button className="icon-button" type="button" onClick={closeSheet} aria-label="Close">
                Close
              </button>
            </header>

            <EnthusiasmBlock application={selected} />

            <dl className="meta">
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${selected.email}`}>{selected.email}</a>
                </dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>{selected.phone || 'Not given'}</dd>
              </div>
              <div>
                <dt>Years selling</dt>
                <dd>{selected.years}</dd>
              </div>
              <div>
                <dt>Outreach appetite</dt>
                <dd>{selected.energy} / 5</dd>
              </div>
              <div>
                <dt>Quota</dt>
                <dd>{quotaLabel(selected.quota)}</dd>
              </div>
              <div>
                <dt>Applied</dt>
                <dd>{formatWhen(selected.createdAt)}</dd>
              </div>
            </dl>

            <h3>What lights them up</h3>
            <p className="prose">{selected.whySales}</p>
            <h3>Their pitch</h3>
            <blockquote>
              <p>{selected.pitch}</p>
            </blockquote>

            <label className="note">
              Desk note
              <textarea
                value={selected.note}
                maxLength={500}
                rows={3}
                onChange={(event) => setNote(selected.id, event.target.value)}
                placeholder="What should the next conversation test?"
              />
            </label>

            {confirming === 'hire' && (
              <p className="confirm" role="alert">
                Hire {selected.name} for {roleBySlug(selected.roleSlug)?.title}? This marks the seat filled on the
                desk.
              </p>
            )}
            {confirming === 'decline' && (
              <p className="confirm" role="alert">
                Decline {selected.name}? You can bring them back to Applied later.
              </p>
            )}

            <footer className="sheet-actions">
              {selected.stage !== 'applied' && (
                <button className="button ghost" type="button" onClick={() => back(selected)}>
                  {selected.stage === 'declined' ? 'Reconsider' : `Back to ${STAGE_LABEL[prevStage(selected.stage)!]}`}
                </button>
              )}
              {selected.stage !== 'hired' && selected.stage !== 'declined' && confirming !== 'decline' && (
                <button className="button quiet" type="button" onClick={() => setConfirming('decline')}>
                  Decline
                </button>
              )}
              {confirming === 'decline' && (
                <button className="button danger" type="button" onClick={() => decline(selected)}>
                  Confirm decline
                </button>
              )}
              {confirming === 'hire' && (
                <button className="button primary" type="button" onClick={() => hire(selected)}>
                  Confirm hire
                </button>
              )}
              {confirming !== 'hire' && nextStage(selected.stage) && (
                <button className="button primary" type="button" onClick={() => advance(selected)}>
                  {stageActionLabel(selected.stage, firstName(selected.name))}
                </button>
              )}
              {selected.stage === 'hired' && <p className="hired-stamp">Hired</p>}
            </footer>
            <p className="sheet-links">
              <Link to={`/roles/${selected.roleSlug}`}>View the role</Link>
            </p>
          </article>
        </div>
      )}
    </div>
  )
}

function CandidateCard({
  application,
  selected,
  onOpen,
}: {
  application: Application
  selected: boolean
  onOpen: () => void
}) {
  const enthusiasm = enthusiasmOf(application)
  const role = roleBySlug(application.roleSlug)
  return (
    <article
      className={`person ${selected ? 'person-on' : ''}`}
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData('text/plain', application.id)
        event.dataTransfer.effectAllowed = 'move'
      }}
    >
      <button type="button" onClick={onOpen}>
        <span className="person-name">{application.name}</span>
        <span className="person-role">{role?.title}</span>
        <span className={`pill pill-${slug(enthusiasm.label)}`}>
          {enthusiasm.label}
          <span>{enthusiasm.score}</span>
        </span>
      </button>
    </article>
  )
}

function EnthusiasmBlock({ application }: { application: Application }) {
  const enthusiasm = enthusiasmOf(application)
  return (
    <div className="meter">
      <div>
        <span>Enthusiasm</span>
        <strong>{enthusiasm.label}</strong>
      </div>
      <div className="meter-track" aria-hidden="true">
        <span style={{ width: `${enthusiasm.score}%` }} />
      </div>
      <p>From the pitch, why they sell, outreach appetite, years, and quota comfort.</p>
    </div>
  )
}

function quotaLabel(quota: Application['quota']): string {
  if (quota === 'ready') return 'Wants a quota'
  if (quota === 'building') return 'Building toward one'
  return 'Unsure'
}

function formatWhen(iso: string): string {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(iso))
}

function slug(label: string): string {
  return label.toLowerCase().replace(/\s+/g, '-')
}
