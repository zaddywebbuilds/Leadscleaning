import { useState } from 'react'
import ScrollReveal from '../components/ScrollReveal'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import { Link } from 'react-router-dom'
import './Results.css'

const BA = (name: string) => `./assets/before-after/${name}.jpg`

const comparisons = [
  { id: 'kitchen', label: 'Kitchen', before: BA('kitchen-before'), after: BA('kitchen-after'), beforeAlt: 'Kitchen before cleaning', afterAlt: 'Kitchen after cleaning' },
  { id: 'bathroom', label: 'Bathroom', before: BA('bathroom-before'), after: BA('bathroom-after'), beforeAlt: 'Bathroom before cleaning', afterAlt: 'Bathroom after cleaning' },
  { id: 'living-room', label: 'Living Room', before: BA('living-room-before'), after: BA('living-room-after'), beforeAlt: 'Living room before cleaning', afterAlt: 'Living room after cleaning' },
  { id: 'bedroom', label: 'Bedroom', before: BA('bedroom-before'), after: BA('bedroom-after'), beforeAlt: 'Bedroom before cleaning', afterAlt: 'Bedroom after cleaning' },
]

export default function Results() {
  const [active, setActive] = useState('kitchen')
  const current = comparisons.find(c => c.id === active)!

  return (
    <div className="results-page">
      <section className="page-hero page-hero--limestone">
        <div className="container">
          <p className="eyebrow">Before &amp; After</p>
          <h1 className="page-hero__title">A visible<br /><em>difference.</em></h1>
          <p className="page-hero__sub">
            The following comparisons are illustrative concept images — not records of actual client projects.
            They show the kind of transformation attentive cleaning can achieve.
          </p>
        </div>
      </section>

      <section className="results-gallery">
        <div className="container">
          <ScrollReveal>
            <nav className="results-tabs" aria-label="Room comparisons">
              {comparisons.map(c => (
                <button
                  key={c.id}
                  className={`results-tab${active === c.id ? ' results-tab--active' : ''}`}
                  onClick={() => setActive(c.id)}
                  aria-pressed={active === c.id}
                >
                  {c.label}
                </button>
              ))}
            </nav>
          </ScrollReveal>

          <ScrollReveal delay={100} key={active}>
            <div className="results-slider-wrap">
              <BeforeAfterSlider
                before={current.before}
                after={current.after}
                beforeAlt={current.beforeAlt}
                afterAlt={current.afterAlt}
                label={`${current.label} before and after cleaning comparison`}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="results-grid">
              {comparisons.map(c => (
                <button
                  key={c.id}
                  className={`results-thumb${active === c.id ? ' results-thumb--active' : ''}`}
                  onClick={() => setActive(c.id)}
                  aria-label={`View ${c.label} comparison`}
                >
                  <img src={c.after} alt={c.afterAlt} className="results-thumb__img" loading="lazy" />
                  <span className="results-thumb__label">{c.label}</span>
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="results-note">
        <div className="container">
          <ScrollReveal>
            <div className="results-note__card">
              <p className="eyebrow">A Note on These Images</p>
              <p>
                All before-and-after pairs shown here are AI-generated concept illustrations.
                They are intended to represent the type of transformation cleaning services
                can achieve — they do not depict actual Leads Cleaning client projects or
                customer homes. When the owner provides documented job photography, these
                images will be replaced.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="page-cta">
        <div className="container page-cta__inner">
          <ScrollReveal>
            <h2 className="page-cta__heading">See the difference in your own home.</h2>
            <p className="page-cta__sub">Request a quote and let's talk about what your space needs.</p>
            <Link to="/quote" className="btn btn-primary">Request a Quote</Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
