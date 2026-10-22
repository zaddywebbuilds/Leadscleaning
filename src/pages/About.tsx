import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import './About.css'

const IMG = (name: string, ext = 'webp') => `./assets/photos/${name}.${ext}`

export default function About() {
  return (
    <div className="about-page">
      <section className="page-hero page-hero--ivory">
        <div className="container">
          <p className="eyebrow">Who We Are</p>
          <h1 className="page-hero__title">A cleaning service<br /><em>built on quiet care.</em></h1>
          <p className="page-hero__sub">Leads Cleaning was founded to bring a more thoughtful approach to home cleaning in Calgary.</p>
        </div>
      </section>

      <section className="about-story">
        <div className="container about-story__inner">
          <ScrollReveal className="about-story__text">
            <p className="eyebrow">Our Story</p>
            <h2 className="about-story__heading">Calgary-based.<br />Detail-focused.</h2>
            <p>
              Leads Cleaning is a Calgary home cleaning service focused on delivering
              genuinely attentive care to the homes we work in. We believe that the
              standard of cleaning should remain consistent regardless of visit frequency —
              the same care on your first appointment as your fiftieth.
            </p>
            <p>
              We serve houses, apartments, and condos across Calgary, working around
              each client's schedule and adapting to the specific needs of each space.
            </p>
            <p>
              We're a small operation by design — it keeps the quality personal and the
              communication direct.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={150} className="about-story__photos">
            <div className="about-story__photo-stack">
              <picture>
                <source srcSet={IMG('cleaning-supplies')} type="image/webp" />
                <img src={IMG('cleaning-supplies', 'jpg')} alt="Professional cleaning supplies prepared for a visit" className="about-story__photo about-story__photo--main" loading="lazy" />
              </picture>
              <picture>
                <source srcSet={IMG('faucet-detail')} type="image/webp" />
                <img src={IMG('faucet-detail', 'jpg')} alt="Careful faucet detail work" className="about-story__photo about-story__photo--accent" loading="lazy" />
              </picture>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow" style={{ textAlign: 'center' }}>What Guides Us</p>
            <h2 className="about-values__heading">Our values, in practice.</h2>
          </ScrollReveal>
          <div className="about-values__grid">
            {[
              { title: 'Consistency above all', desc: 'A home cleaned once to a high standard means little without consistency. We aim to make every visit feel like the first.' },
              { title: 'Transparency', desc: 'We confirm scope before every visit. No surprises, no inflated expectations — just honest, agreed-upon work.' },
              { title: 'Respect for your space', desc: 'We treat your home as you would want it treated. Careful, unhurried, and with full regard for your belongings.' },
              { title: 'Clear communication', desc: 'Easy to reach, straightforward to book, and responsive when you need to make changes.' },
            ].map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 80}>
                <div className="about-value">
                  <div className="about-value__num">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="about-value__title">{v.title}</h3>
                  <p className="about-value__desc">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-photo-row">
        <div className="container">
          <div className="about-photo-row__grid">
            {[
              { img: 'cabinet-detail-cleaning', alt: 'Cabinet handles carefully cleaned', cap: 'The edges others miss.' },
              { img: 'kitchen-counter-cleaning', alt: 'Kitchen counter polished clean', cap: 'Kitchen care, done properly.' },
              { img: 'living-room-vacuuming', alt: 'Living room vacuumed with care', cap: 'Floors you notice.' },
            ].map((p, i) => (
              <ScrollReveal key={p.img} delay={i * 80}>
                <figure className="about-photo-fig">
                  <picture>
                    <source srcSet={IMG(p.img)} type="image/webp" />
                    <img src={IMG(p.img, 'jpg')} alt={p.alt} className="about-photo-fig__img" loading="lazy" />
                  </picture>
                  <figcaption className="about-photo-fig__cap">{p.cap}</figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="page-cta">
        <div className="container page-cta__inner">
          <ScrollReveal>
            <h2 className="page-cta__heading">Come home to a better kind of clean.</h2>
            <p className="page-cta__sub">Request a quote and we'll be in touch to confirm what works for your home.</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/quote" className="btn btn-primary">Request a Quote</Link>
              <Link to="/approach" className="btn" style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--evergreen)' }}>
                See Our Approach
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
