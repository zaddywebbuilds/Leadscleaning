import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__wordmark">Leads Cleaning</span>
          <p className="footer__tagline">Thoughtful home cleaning in Calgary, Alberta.</p>
          <a href="tel:+14036070581" className="footer__phone">+1 403-607-0581</a>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          <div className="footer__nav-col">
            <span className="footer__nav-heading">Services</span>
            <Link to="/services">House Cleaning</Link>
            <Link to="/services">Apartment Cleaning</Link>
            <Link to="/services">Recurring Cleaning</Link>
          </div>
          <div className="footer__nav-col">
            <span className="footer__nav-heading">Company</span>
            <Link to="/about">About</Link>
            <Link to="/approach">Our Approach</Link>
            <Link to="/results">Results</Link>
            <Link to="/faq">FAQs</Link>
          </div>
          <div className="footer__nav-col">
            <span className="footer__nav-heading">Connect</span>
            <Link to="/quote">Get a Quote</Link>
            <a
              href="https://www.google.com/maps/place/Leads+Cleaning/@51.0276233,-114.087835,10z"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Maps
            </a>
            <a href="tel:+14036070581">Call Us</a>
          </div>
        </nav>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__legal">
            &copy; {new Date().getFullYear()} Leads Cleaning. Calgary, Alberta. All rights reserved.
          </p>
          <div className="footer__legal-links">
            <Link to="/faq">Privacy Policy</Link>
            <Link to="/faq">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
