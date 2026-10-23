import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import './Nav.css'

const links = [
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/approach', label: 'Our Approach' },
  { to: '/results', label: 'Results' },
  { to: '/faq', label: 'FAQs' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > 32)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const close = () => setOpen(false)

  // Only the home hero presents a dark field behind the nav.
  const overDarkHero = pathname === '/'
  const solid = !overDarkHero || scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className={`nav${solid ? ' nav--solid' : ''}`} role="banner">
        <div className="nav__inner container">
          <Link to="/" className="nav__wordmark" aria-label="Leads Cleaning — home">
            <span className="nav__wordmark-name">Leads</span>
            <span className="nav__wordmark-sub">Cleaning</span>
          </Link>

          <nav className="nav__links" aria-label="Main navigation">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => `nav__link${isActive ? ' nav__link--active' : ''}`}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <Link to="/quote" className="btn btn-bronze nav__cta">Request a Quote</Link>

          <button
            className={`nav__burger${open ? ' nav__burger--open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div className={`nav__drawer${open ? ' nav__drawer--open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Mobile navigation" className="nav__drawer-inner">
          <NavLink to="/" className="nav__drawer-link" onClick={close}>Home</NavLink>
          {links.map(l => (
            <NavLink key={l.to} to={l.to} className="nav__drawer-link" onClick={close}>{l.label}</NavLink>
          ))}
          <Link to="/quote" className="btn btn-bronze nav__drawer-cta" onClick={close}>Request a Quote</Link>
          <a href="tel:+14036070581" className="nav__drawer-phone">+1 403-607-0581</a>
        </nav>
      </div>

      {/* Redundant on the quote page itself, where it would also sit over the form */}
      <div className={`nav__mobile-bar${pathname === '/quote' ? ' nav__mobile-bar--hidden' : ''}`}>
        <a href="tel:+14036070581" className="nav__mobile-call" aria-label="Call Leads Cleaning">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"
              stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Call
        </a>
        <Link to="/quote" className="nav__mobile-quote">Request a Quote</Link>
      </div>
    </>
  )
}
