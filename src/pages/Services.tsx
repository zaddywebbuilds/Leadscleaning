import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import Photo from '../components/Photo'
import './Services.css'

const detail = [
  {
    id: 'house-cleaning',
    n: '01',
    title: 'House Cleaning',
    img: 'kitchen-counter-cleaning',
    alt: 'Kitchen surfaces and counters cleaned to a high standard',
    body: 'A comprehensive clean of the entire home — kitchen to bedrooms, bathrooms to living areas. Each room receives systematic, attentive care that leaves the house feeling genuinely reset.',
    includes: [
      'Kitchen surfaces, appliance exteriors, sink and fixtures',
      'Bathrooms including fixtures, surfaces and mirrors',
      'Living and dining areas — dusting, vacuuming, tidying',
      'Bedroom cleaning and bed making (linens provided by client)',
      'Floors throughout — swept, mopped or vacuumed as appropriate',
    ],
    note: 'Specific inclusions are confirmed with each client before the visit.',
    cta: 'Request a Quote',
  },
  {
    id: 'apartment-cleaning',
    n: '02',
    title: 'Apartment Cleaning',
    img: 'bathroom-clean-interior',
    alt: 'Bright, clean apartment bathroom',
    body: 'Shaped for apartment and condo living — from studios through to multi-bedroom units. Smaller footprints ask for a different rhythm, and we adapt the approach to make the most of every area.',
    includes: [
      'Full kitchen and bathroom cleaning',
      'Living and sleeping area care',
      'Balcony wipe-down where accessible',
      'All floor surfaces — hardwood, tile or carpet',
    ],
    note: 'We work around building access, parking and lobby requirements.',
    cta: 'Request a Quote',
  },
  {
    id: 'recurring-cleaning',
    n: '03',
    title: 'Recurring Cleaning',
    img: 'bedroom-fresh-linens',
    alt: 'Bedroom with freshly made bed and clean linens',
    body: 'The most effortless way to keep a home you are proud of. Set a regular rhythm — weekly, bi-weekly or monthly — and the upkeep stops being something you have to think about.',
    includes: [
      'Consistent scope agreed at the outset',
      'The same standard of care on every visit',
      'Flexible scheduling around your week',
      'Frequency easy to adjust as needs change',
    ],
    note: 'Recurring clients are prioritised for scheduling. Get in touch to discuss your preferred cadence.',
    cta: 'Set Up Regular Cleaning',
  },
]

const within = [
  { img: 'cabinet-detail-cleaning', alt: 'Cabinet fronts and handles being cleaned', title: 'Kitchen Details', desc: 'Surfaces, cabinet fronts and fixtures cleaned with care.' },
  { img: 'faucet-detail', alt: 'Tap and fixture polished to a shine', title: 'Bathroom Fixtures', desc: 'Taps, faucets, mirrors and surfaces left spotless.' },
  { img: 'living-room-vacuuming', alt: 'Living room floor being vacuumed', title: 'Living Spaces', desc: 'Floors, surfaces and furniture attended to thoroughly.' },
  { img: 'calgary-entryway', alt: 'Tidy, welcoming home entryway', title: 'Entryways', desc: 'The first thing you see when you walk in, treated as such.' },
]

export default function Services() {
  return (
    <div className="services-page">

      <section className="page-hero page-hero--split surf-evergreen">
        <div className="container page-hero__grid">
          <div>
            <span className="eyebrow page-hero__eyebrow">What We Offer</span>
            <span className="rule" />
            <h1 className="page-hero__title">Cleaning services <em>designed around your home.</em></h1>
            <p className="page-hero__sub">
              Three focused services — each carried out with the same meticulous care.
            </p>
          </div>
          <div className="page-hero__panel">
            <Photo name="cleaning-supplies" alt="Professional cleaning supplies prepared for a visit" eager className="ar-landscape" />
          </div>
        </div>
      </section>

      {detail.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className={`svc ${i % 2 === 0 ? 'surf-ivory' : 'surf-limestone'} ${i === 0 ? 'sec-lg' : 'sec-lg'}`}
        >
          <div className={`container svc__grid${i % 2 !== 0 ? ' svc__grid--reverse' : ''}`}>
            <ScrollReveal className="svc__photo">
              <Photo name={s.img} alt={s.alt} className="ph--zoom ar-wide" />
            </ScrollReveal>

            <ScrollReveal delay={120} className="svc__text">
              <span className="svc__index">Service {s.n}</span>
              <h2 className="svc__title">{s.title}</h2>
              <p className="svc__body">{s.body}</p>

              <h3 className="svc__sub">What this typically includes</h3>
              <ul className="svc__list">
                {s.includes.map(item => <li key={item}>{item}</li>)}
              </ul>

              <p className="svc__note">{s.note}</p>
              <Link to="/quote" className="btn btn-primary">{s.cta}</Link>
            </ScrollReveal>
          </div>
        </section>
      ))}

      <section className="within surf-forest sec-lg">
        <div className="container">
          <ScrollReveal className="within__head">
            <span className="eyebrow">Within Every Visit</span>
            <h2 className="within__heading">The areas we always attend to.</h2>
          </ScrollReveal>

          <div className="within__grid">
            {within.map((w, i) => (
              <ScrollReveal key={w.title} delay={i * 80}>
                <figure className="within__card">
                  <Photo name={w.img} alt={w.alt} className="ph--zoom ar-square" />
                  <figcaption>
                    <h3 className="within__card-title">{w.title}</h3>
                    <p className="within__card-desc">{w.desc}</p>
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="page-cta surf-ivory">
        <div className="container page-cta__inner">
          <ScrollReveal>
            <span className="eyebrow">Ready When You Are</span>
            <h2 className="page-cta__heading">Tell us about your home.</h2>
            <p className="page-cta__sub lede">
              Share a few details and we will come back to confirm scope and scheduling.
            </p>
            <div className="page-cta__actions">
              <Link to="/quote" className="btn btn-primary">Request a Quote</Link>
              <a href="tel:+14036070581" className="btn btn-ghost-dark">Call +1 403-607-0581</a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
