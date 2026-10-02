import { Link } from 'react-router-dom'
import { BOARD_STAGES, STAGE_LABEL } from '../pipeline'
import { roles } from '../roles'
import { useStore } from '../store'

export function HomePage() {
  const { applications } = useStore()
  const counts = BOARD_STAGES.map((stage) => ({
    stage,
    count: applications.filter((application) => application.stage === stage).length,
  }))

  return (
    <div className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Hiring, enthusiast only</p>
          <h1>
            We hire sales
            <em> enthusiasts.</em>
          </h1>
          <p className="lede">
            Upleap is a hiring desk for people who light up on a live call, rewrite their own pitch, and want a
            number. Apply with how you sell. We hire from the desk, not from a pile of résumés.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#roles">
              See open roles
            </a>
            <Link className="button ghost" to="/desk">
              Open the hiring desk
            </Link>
          </div>
        </div>
        <aside className="snapshot" aria-label="Live hiring desk">
          <div className="snapshot-head">
            <span>On the desk</span>
            <Link to="/desk">Open</Link>
          </div>
          <ul>
            {counts.map(({ stage, count }) => (
              <li key={stage}>
                <span>{STAGE_LABEL[stage]}</span>
                <strong>{count}</strong>
              </li>
            ))}
          </ul>
          <p>Sample candidates are loaded so you can hire someone before the first real application lands.</p>
        </aside>
      </section>

      <section className="traits" aria-label="What we hire for">
        <article>
          <h2>Appetite</h2>
          <p>Rejection is information. The people we hire get more precise after a no, not quieter.</p>
        </article>
        <article>
          <h2>A point of view</h2>
          <p>They can pitch the work in their own words. If the writing is empty, the calls will be too.</p>
        </article>
        <article>
          <h2>A number</h2>
          <p>Quota is the job. We ask whether they want one, not whether they can tolerate one.</p>
        </article>
      </section>

      <section id="roles" className="roles">
        <div className="section-head">
          <h2>Open roles</h2>
          <p>Four seats. Same bar.</p>
        </div>
        <div className="role-grid">
          {roles.map((role, index) => (
            <Link key={role.slug} to={`/roles/${role.slug}`} className="role-card">
              <span className="index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{role.title}</h3>
              <p>{role.summary}</p>
              <dl>
                <div>
                  <dt>Number</dt>
                  <dd>{role.quota}</dd>
                </div>
                <div>
                  <dt>Pay</dt>
                  <dd>{role.comp}</dd>
                </div>
              </dl>
              <span className="card-link">Apply for this seat</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="steps">
        <h2>How a hire happens</h2>
        <ol>
          <li>
            <strong>They apply in their own voice.</strong>
            <span>A pitch and a reason they sell, not a file upload into the void.</span>
          </li>
          <li>
            <strong>The desk reads the enthusiasm.</strong>
            <span>Screen, interview, offer. Notes stay on the person.</span>
          </li>
          <li>
            <strong>Someone gets hired.</strong>
            <span>The offer step is a hire button. The board keeps the record.</span>
          </li>
        </ol>
      </section>
    </div>
  )
}
