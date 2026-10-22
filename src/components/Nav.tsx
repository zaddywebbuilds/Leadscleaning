import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Nav.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/approach', label: 'Our Approach' },
  { to: '/results', label: 'Results' },
  { to: '/faq', label: 'FAQs' },
]

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`nav${solid ? ' nav--solid' : ''}`} role="banner">
        <div className="nav__inner container">
          <Link to="/" className="nav__wordmark" aria-label="Leads Cleaning — home">
            <span className="nav__wordmark-leads">Leads</span>
            <span className="nav__wordmark-cleaning">Cleaning</span>
          </Link>

          <nav className="nav__links" aria-label="Main navigation">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => `nav__link${isActive ? ' nav__link--active' : ''}`}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <Link to="/quote" className="btn btn-primary nav__cta">Request a Quote</Link>

          <button
            className={`nav__hamburger${open ? ' nav__hamburger--open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`nav__drawer${open ? ' nav__drawer--open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className="nav__drawer-link" onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/quote" className="btn btn-primary nav__drawer-cta" onClick={() => setOpen(false)}>
            Request a Quote
          </Link>
        </nav>
      </div>

      {/* Mobile sticky CTA bar */}
      <div className="nav__mobile-cta">
        <Link to="/quote" className="btn btn-primary">Request a Quote</Link>
      </div>
    </>
  )
}
