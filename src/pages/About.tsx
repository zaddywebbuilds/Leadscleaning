import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import Photo from '../components/Photo'
import './About.css'

const values = [
  { title: 'Consistency above all', desc: 'A home cleaned once to a high standard means little without consistency. The aim is for every visit to feel like the first.' },
  { title: 'Transparency', desc: 'Scope is confirmed before every visit. No surprises, no inflated expectations — just honest, agreed-upon work.' },
  { title: 'Respect for your space', desc: 'Your home is treated the way you would want it treated: carefully, unhurriedly, and with full regard for your belongings.' },
  { title: 'Clear communication', desc: 'Easy to reach, straightforward to book, and responsive when something needs to change.' },
]

const gallery = [
  { img: 'cabinet-detail-cleaning', alt: 'Cabinet handles and fronts carefully cleaned', cap: 'The edges others miss.' },
  { img: 'kitchen-counter-cleaning', alt: 'Kitchen counter cleaned and polished', cap: 'Kitchen care, done properly.' },
  { img: 'living-room-vacuuming', alt: 'Living room floor vacuumed with care', cap: 'Floors you notice.' },
]

export default function About() {
  return (
    <div className="about-page">

      <section className="page-hero page-hero--split surf-limestone">
        <div className="container page-hero__grid">
          <div>
            <span className="eyebrow page-hero__eyebrow">Who We Are</span>
            <span className="rule" />
            <h1 className="page-hero__title">A cleaning service <em>built on quiet care.</em></h1>
            <p className="page-hero__sub">
              Leads Cleaning exists to bring a more thoughtful approach to home cleaning
              in Calgary — unhurried, consistent, and genuinely attentive.
            </p>
          </div>
          <div className="page-hero__panel">
            <Photo name="calgary-entryway" alt="Welcoming, well-kept entryway of a Calgary home" eager className="ar-landscape" />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="story surf-ivory sec-lg">
        <div className="container story__grid">
          <ScrollReveal className="story__text">
            <span className="eyebrow">Our Story</span>
            <h2 className="story__heading">Calgary-based.<br /><em>Detail-focused.</em></h2>
            <p>
              Leads Cleaning is a Calgary home cleaning service focused on delivering
              genuinely attentive care to the homes we work in. We believe the standard
              should hold regardless of how often we visit — the same care on a first
              appointment as on a fiftieth.
            </p>
            <p>
              We serve houses, apartments and condos across Calgary, working around each
              client's schedule and adapting to what a particular space actually needs.
            </p>
            <p>
              We are a small operation by design. It keeps the quality personal and the
              communication direct.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={140} className="story__photos">
            <Photo name="cleaning-supplies" alt="Cleaning supplies prepared ahead of a visit" className="story__photo-main ar-tall" />
            <Photo name="faucet-detail" alt="Close detail of a polished tap" className="story__photo-inset ar-square" />
          </ScrollReveal>
        </div>
      </section>

      {/* Values — editorial numbered list, not cards */}
      <section className="values surf-evergreen sec-lg">
        <div className="container values__grid">
          <ScrollReveal className="values__aside">
            <span className="eyebrow">What Guides Us</span>
            <h2 className="values__heading">Our values,<br />in practice.</h2>
          </ScrollReveal>

          <ol className="values__list">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 70}>
                <li className="values__item">
                  <span className="values__num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="values__item-title">{v.title}</h3>
                    <p className="values__item-desc">{v.desc}</p>
                  </div>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Gallery */}
      <section className="about-gallery surf-ivory sec-md">
        <div className="container">
          <div className="about-gallery__grid">
            {gallery.map((g, i) => (
              <ScrollReveal key={g.img} delay={i * 80}>
                <figure className="about-fig">
                  <Photo name={g.img} alt={g.alt} className="ph--zoom ar-landscape" />
                  <figcaption className="about-fig__cap">{g.cap}</figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
          <p className="disclosure about-gallery__note">
            Imagery on this site is illustrative and does not depict Leads Cleaning staff or client homes.
          </p>
        </div>
      </section>

      <section className="page-cta surf-limestone">
        <div className="container page-cta__inner">
          <ScrollReveal>
            <span className="eyebrow">Get Started</span>
            <h2 className="page-cta__heading">Come home to a better kind of clean.</h2>
            <p className="page-cta__sub lede">
              Request a quote and we will be in touch to confirm what works for your home.
            </p>
            <div className="page-cta__actions">
              <Link to="/quote" className="btn btn-primary">Request a Quote</Link>
              <Link to="/approach" className="btn btn-ghost-dark">See Our Approach</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
