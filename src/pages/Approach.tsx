import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import Photo from '../components/Photo'
import './Approach.css'

const steps = [
  {
    n: '01',
    title: 'Request a Quote',
    desc: 'Use the quote form to share your home type, size, the areas that matter most, and any preferences or sensitivities. The more we understand up front, the better the visit can be tailored.',
    img: 'cleaning-supplies',
    alt: 'Cleaning supplies prepared and ready for a visit',
  },
  {
    n: '02',
    title: 'Confirm Your Cleaning',
    desc: 'We follow up to talk through what is included, confirm pricing and agree a clear scope before anything is booked. No assumptions, and nothing decided on the day.',
    img: 'kitchen-counter-cleaning',
    alt: 'Clean kitchen counter — the result of a clearly agreed scope',
  },
  {
    n: '03',
    title: 'Professional Cleaning',
    desc: 'On the day, we work systematically through the home, giving each area the same attentiveness — whether it is a first-time clean or a regular maintenance visit.',
    img: 'cabinet-detail-cleaning',
    alt: 'Cabinet fronts being carefully cleaned',
  },
  {
    n: '04',
    title: 'Enjoy Your Space',
    desc: 'You return to a home that has been genuinely cared for. For recurring clients this becomes the baseline — a consistently maintained home that asks nothing of you.',
    img: 'hero-calgary-living-room',
    alt: 'Calm, beautifully maintained living room',
  },
]

const principles = [
  { title: 'Agreed before begun', desc: 'Scope is settled in advance so expectations match on both sides.' },
  { title: 'Unhurried by default', desc: 'Rushing is how detail gets missed. We plan time realistically.' },
  { title: 'Consistent standards', desc: 'The same checklist and the same care, visit after visit.' },
  { title: 'Easy to adjust', desc: 'Frequency, scope and scheduling can change as your needs do.' },
]

export default function Approach() {
  return (
    <div className="approach-page">

      <section className="page-hero page-hero--split surf-ivory">
        <div className="container page-hero__grid">
          <div>
            <span className="eyebrow page-hero__eyebrow">How We Work</span>
            <span className="rule" />
            <h1 className="page-hero__title">An approach built <em>on clarity and care.</em></h1>
            <p className="page-hero__sub">
              From the first enquiry through to a consistently clean home — here is
              exactly what to expect at each stage.
            </p>
          </div>
          <div className="page-hero__panel">
            <Photo name="living-room-vacuuming" alt="Living room being carefully vacuumed" eager className="ar-landscape" />
          </div>
        </div>
      </section>

      {/* Connected timeline */}
      <section className="timeline surf-limestone sec-lg">
        <div className="container">
          <ol className="timeline__list">
            {steps.map((s, i) => (
              <li key={s.n} className={`timeline__row${i % 2 !== 0 ? ' timeline__row--reverse' : ''}`}>
                <ScrollReveal className="timeline__photo">
                  <Photo name={s.img} alt={s.alt} className="ph--zoom ar-landscape" eager={i === 0} />
                </ScrollReveal>

                <ScrollReveal delay={130} className="timeline__text">
                  <div className="timeline__marker" aria-hidden="true">
                    <span className="timeline__dot" />
                    <span className="timeline__n">{s.n}</span>
                  </div>
                  <h2 className="timeline__title">{s.title}</h2>
                  <p className="timeline__desc">{s.desc}</p>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Principles */}
      <section className="principles surf-forest sec-md">
        <div className="container">
          <ScrollReveal className="principles__head">
            <span className="eyebrow">What Stays Constant</span>
            <h2 className="principles__heading">The principles behind every visit.</h2>
          </ScrollReveal>

          <div className="principles__grid">
            {principles.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 70}>
                <div className="principle">
                  <h3 className="principle__title">{p.title}</h3>
                  <p className="principle__desc">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="page-cta surf-ivory">
        <div className="container page-cta__inner">
          <ScrollReveal>
            <span className="eyebrow">Start Here</span>
            <h2 className="page-cta__heading">Ready when you are.</h2>
            <p className="page-cta__sub lede">
              Share a few details about your home and we will take it from there.
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
