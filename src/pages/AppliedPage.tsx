import { Link, useParams } from 'react-router-dom'
import { roleBySlug } from '../roles'
import { enthusiasmOf } from '../score'
import { useStore } from '../store'

export function AppliedPage() {
  const { id } = useParams()
  const { applications } = useStore()
  const application = applications.find((item) => item.id === id)
  const role = roleBySlug(application?.roleSlug)

  if (!application || !role) {
    return (
      <div className="page narrow">
        <h1>We could not find that application.</h1>
        <Link className="button primary" to="/">
          Back to roles
        </Link>
      </div>
    )
  }

  const enthusiasm = enthusiasmOf(application)

  return (
    <div className="page narrow">
      <p className="eyebrow">Application in</p>
      <h1>We have your pitch, {application.name.split(' ')[0]}.</h1>
      <p className="lede">
        {role.title} is on the hiring desk. A person reads this the way they would take a first call.
      </p>
      <blockquote>
        <p>{application.pitch}</p>
      </blockquote>
      <p className="enthusiasm-line">
        Enthusiasm reading <strong>{enthusiasm.label}</strong>
        <span>{enthusiasm.score}</span>
      </p>
      <div className="hero-actions">
        <Link className="button primary" to="/desk">
          See it on the desk
        </Link>
        <Link className="button ghost" to="/">
          Other roles
        </Link>
      </div>
    </div>
  )
}
