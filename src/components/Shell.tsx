import { NavLink } from 'react-router-dom'
import type { ReactNode } from 'react'

export function Mark() {
  return (
    <svg className="mark" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M5 22c5-1.4 7.6-8.2 9.6-14.2C17.4 13.6 20 16.4 27 16.8" />
      <circle cx="26.2" cy="16.6" r="1.8" />
    </svg>
  )
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header className="top">
        <NavLink to="/" className="brand" aria-label="Upleap home">
          <Mark />
          <span>Upleap</span>
        </NavLink>
        <nav className="nav">
          <NavLink to="/" end>
            Roles
          </NavLink>
          <NavLink to="/desk">Hiring desk</NavLink>
        </nav>
      </header>
      <main id="content">{children}</main>
      <footer className="foot">
        <span>Upleap hires people who want the work.</span>
        <span>Enthusiast-only bar.</span>
      </footer>
    </>
  )
}
