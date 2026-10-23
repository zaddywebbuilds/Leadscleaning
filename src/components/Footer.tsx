import { Link } from 'react-router-dom'
import './Footer.css'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__top">
        <div className="footer__brand">
          <Link to="/" className="footer__wordmark">
            <span className="footer__wordmark-name">Leads</span>
            <span className="footer__wordmark-sub">Cleaning</span>
          </Link>
          <p className="footer__tagline">
            Thoughtful home cleaning in Calgary, Alberta.
          </p>
          <a href="tel:+14036070581" className="footer__phone">+1 403-607-0581</a>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          <div className="footer__col">
            <h2 className="footer__col-title">Services</h2>
            <Link to="/services#house-cleaning">House Cleaning</Link>
            <Link to="/services#apartment-cleaning">Apartment Cleaning</Link>
            <Link to="/services#recurring-cleaning">Recurring Cleaning</Link>
          </div>

          <div className="footer__col">
            <h2 className="footer__col-title">Company</h2>
            <Link to="/about">About</Link>
            <Link to="/approach">Our Approach</Link>
            <Link to="/results">Results</Link>
            <Link to="/faq">FAQs</Link>
          </div>

          <div className="footer__col">
            <h2 className="footer__col-title">Get in Touch</h2>
            <Link to="/quote">Request a Quote</Link>
            <a href="tel:+14036070581">Call Us</a>
            <a
              href="https://www.google.com/maps/place/Leads+Cleaning/@51.0276233,-114.087835,10z"
              target="_blank"
              rel="noopener noreferrer"
            >
              Find Us on Google Maps
            </a>
          </div>
        </nav>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__legal">
            © {YEAR} Leads Cleaning · Calgary, Alberta
          </p>
          <p className="footer__disclaimer">
            Photography on this site is illustrative and does not depict Leads Cleaning
            staff or client homes.
          </p>
        </div>
      </div>
    </footer>
  )
}
