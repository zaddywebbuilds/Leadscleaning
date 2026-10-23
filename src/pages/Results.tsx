import { useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import './Results.css'

const BA = (name: string) => `./assets/before-after/${name}.jpg`

const comparisons = [
  { id: 'kitchen', label: 'Kitchen', note: 'Counters cleared and wiped, sink and fixtures polished, floor cleaned.' },
  { id: 'bathroom', label: 'Bathroom', note: 'Surfaces, mirrors and fixtures cleaned; floor and basin detailed.' },
  { id: 'living-room', label: 'Living Room', note: 'Surfaces dusted, items reset, floors vacuumed edge to edge.' },
  { id: 'bedroom', label: 'Bedroom', note: 'Bed made, surfaces cleared and dusted, floor cleaned throughout.' },
]

export default function Results() {
  const [active, setActive] = useState('kitchen')
  const current = comparisons.find(c => c.id === active)!

  return (
    <div className="results-page">

      <section className="page-hero surf-forest">
        <div className="container">
          <div className="results-hero">
            <span className="eyebrow page-hero__eyebrow">Before &amp; After</span>
            <span className="rule" />
            <h1 className="page-hero__title">A visible <em>difference.</em></h1>
            <p className="page-hero__sub">
              Drag any comparison to see the change. These are illustrative concept images
              created to show the kind of transformation attentive cleaning achieves — they
              are not records of client projects.
            </p>
          </div>
        </div>
      </section>

      <section className="gallery surf-forest sec-trail">
        <div className="container">
          <ScrollReveal>
            <div className="gallery__tabs" role="tablist" aria-label="Choose a room">
              {comparisons.map(c => (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={active === c.id}
                  className={`gallery__tab${active === c.id ? ' gallery__tab--active' : ''}`}
                  onClick={() => setActive(c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80} className="gallery__stage">
            <div className="gallery__slider">
              <BeforeAfterSlider
                key={active}
                before={BA(`${active}-before`)}
                after={BA(`${active}-after`)}
                beforeAlt={`${current.label} before cleaning`}
                afterAlt={`${current.label} after cleaning`}
                label={`${current.label} before and after comparison`}
                onDark
                hideDisclosure
              />
            </div>

            <div className="gallery__meta">
              <h2 className="gallery__meta-title">{current.label}</h2>
              <p className="gallery__meta-note">{current.note}</p>
              <p className="gallery__hint">
                Drag the handle, or focus it and use the arrow keys.
              </p>
              <p className="disclosure gallery__disclosure">
                Illustrative concept images, not customer projects. These will be
                replaced with documented work once client permissions are in place.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="page-cta surf-ivory">
        <div className="container page-cta__inner">
          <ScrollReveal>
            <span className="eyebrow">Your Turn</span>
            <h2 className="page-cta__heading">See the difference in your own home.</h2>
            <p className="page-cta__sub lede">
              Tell us about your space and we will confirm scope, timing and everything else.
            </p>
            <div className="page-cta__actions">
              <Link to="/quote" className="btn btn-primary">Request a Quote</Link>
              <Link to="/services" className="btn btn-ghost-dark">Browse Services</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
