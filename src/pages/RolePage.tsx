import { useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { roleBySlug } from '../roles'
import { useStore } from '../store'
import type { QuotaComfort } from '../types'
import { hasErrors, validateDraft, type FieldErrors } from '../validate'

const QUOTA_OPTIONS: { value: QuotaComfort; label: string; hint: string }[] = [
  { value: 'ready', label: 'I want a quota', hint: 'Give me the number.' },
  { value: 'building', label: 'I am building toward one', hint: 'New, and serious.' },
  { value: 'unsure', label: 'I am unsure', hint: 'Tell us anyway.' },
]

export function RolePage() {
  const { slug } = useParams()
  const role = roleBySlug(slug)
  const navigate = useNavigate()
  const { submit } = useStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [years, setYears] = useState(0)
  const [energy, setEnergy] = useState(4)
  const [quota, setQuota] = useState<QuotaComfort>('ready')
  const [whySales, setWhySales] = useState('')
  const [pitch, setPitch] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState('')

  const draft = useMemo(
    () => ({
      roleSlug: role?.slug ?? '',
      name,
      email,
      phone,
      city,
      years,
      energy,
      quota,
      whySales,
      pitch,
    }),
    [role?.slug, name, email, phone, city, years, energy, quota, whySales, pitch],
  )

  if (!role) {
    return (
      <div className="page narrow">
        <h1>That role is closed.</h1>
        <p className="lede">The seat you asked for is not on the board.</p>
        <Link className="button primary" to="/">
          Back to open roles
        </Link>
      </div>
    )
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const nextErrors = validateDraft(draft)
    setErrors(nextErrors)
    setFormError('')
    if (hasErrors(nextErrors)) return
    const result = submit(draft)
    if (!result.ok) {
      setFormError(result.error)
      return
    }
    navigate(`/applied/${result.application.id}`)
  }

  return (
    <div className="page">
      <p className="crumb">
        <Link to="/">Open roles</Link>
        <span aria-hidden="true">/</span>
        {role.team}
      </p>
      <header className="role-hero">
        <div>
          <p className="eyebrow">{role.location}</p>
          <h1>{role.title}</h1>
          <p className="lede">{role.summary}</p>
        </div>
        <dl className="role-facts">
          <div>
            <dt>The number</dt>
            <dd>{role.quota}</dd>
          </div>
          <div>
            <dt>Pay</dt>
            <dd>{role.comp}</dd>
          </div>
          <div>
            <dt>Team</dt>
            <dd>{role.team}</dd>
          </div>
        </dl>
      </header>

      <div className="role-layout">
        <section>
          <h2>The day</h2>
          <ul className="plain">
            {role.day.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2>Who thrives</h2>
          <ul className="plain">
            {role.thrives.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <form className="apply" onSubmit={onSubmit} noValidate>
          <div className="apply-head">
            <h2>Apply</h2>
            <p>Write it the way you would say it on a first call.</p>
          </div>

          <label>
            Name
            <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </label>
          <div className="split">
            <label>
              Email
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                inputMode="email"
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </label>
            <label>
              Phone <span className="optional">optional</span>
              <input value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </label>
          </div>
          <div className="split">
            <label>
              City
              <input value={city} onChange={(event) => setCity(event.target.value)} autoComplete="address-level2" />
              {errors.city && <span className="field-error">{errors.city}</span>}
            </label>
            <label>
              Years selling
              <input
                type="number"
                min={0}
                max={60}
                value={years}
                onChange={(event) => setYears(Number(event.target.value))}
              />
              {errors.years && <span className="field-error">{errors.years}</span>}
            </label>
          </div>

          <fieldset>
            <legend>How do you feel about cold outreach?</legend>
            <div className="scale" role="radiogroup" aria-label="Appetite for cold outreach">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value} className={energy === value ? 'scale-on' : ''}>
                  <input
                    type="radio"
                    name="energy"
                    value={value}
                    checked={energy === value}
                    onChange={() => setEnergy(value)}
                  />
                  {value}
                </label>
              ))}
            </div>
            <span className="hint">1 is drained by it. 5 is how you warm up.</span>
          </fieldset>

          <fieldset>
            <legend>Quota</legend>
            <div className="choices">
              {QUOTA_OPTIONS.map((option) => (
                <label key={option.value} className={quota === option.value ? 'choice-on' : ''}>
                  <input
                    type="radio"
                    name="quota"
                    value={option.value}
                    checked={quota === option.value}
                    onChange={() => setQuota(option.value)}
                  />
                  <strong>{option.label}</strong>
                  <span>{option.hint}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label>
            What lights you up about selling?
            <textarea
              value={whySales}
              onChange={(event) => setWhySales(event.target.value)}
              rows={5}
              maxLength={800}
            />
            <Count value={whySales} minimum={40} />
            {errors.whySales && <span className="field-error">{errors.whySales}</span>}
          </label>
          <label>
            Pitch yourself for this seat
            <textarea value={pitch} onChange={(event) => setPitch(event.target.value)} rows={5} maxLength={800} />
            <Count value={pitch} minimum={40} />
            {errors.pitch && <span className="field-error">{errors.pitch}</span>}
          </label>

          {formError && (
            <p className="form-error" role="alert">
              {formError}
            </p>
          )}
          <button className="button primary" type="submit">
            Submit application
          </button>
        </form>
      </div>
    </div>
  )
}

function Count({ value, minimum }: { value: string; minimum: number }) {
  const length = value.trim().length
  if (length >= minimum) return <span className="hint">{length} characters</span>
  return <span className="hint">{minimum - length} more characters so we can hear you</span>
}
