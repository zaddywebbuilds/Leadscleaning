import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import './Approach.css'

const IMG = (name: string, ext = 'webp') => `./assets/photos/${name}.${ext}`

const steps = [
  {
    n: '01',
    title: 'Tell us about your space',
    desc: 'Use our quote form to share your home type, size, what areas matter most, and any specific preferences or sensitivities. The more we understand upfront, the better we can tailor your visit.',
    img: 'cleaning-supplies',
    alt: 'Cleaning supplies prepared and ready',
  },
  {
    n: '02',
    title: 'Confirm your scope',
    desc: 'We\'ll follow up to talk through what\'s included, confirm pricing, and agree on a clear scope before anything is booked. No assumptions, no surprises.',
    img: 'kitchen-counter-cleaning',
    alt: 'Clean kitchen counter — the result of careful scope confirmation',
  },
  {
    n: '03',
    title: 'We clean thoughtfully',
    desc: 'On the day of your visit, we work systematically through your home — attending to each area with the same attentiveness, whether it\'s a first-time deep clean or a regular maintenance visit.',
    img: 'cabinet-detail-cleaning',
    alt: 'Cabinet details being carefully cleaned',
  },
  {
    n: '04',
    title: 'Come home to refreshed spaces',
    desc: 'You return to a home that\'s been genuinely cared for. For recurring clients, this becomes the new normal — a consistently maintained home that requires nothing from you.',
    img: 'hero-calgary-living-room',
    alt: 'Beautiful clean Calgary living room',
  },
]

export default function Approach() {
  return (
    <div className="approach-page">
      <section className="page-hero page-hero--limestone">
        <div className="container">
          <p className="eyebrow">How We Work</p>
          <h1 className="page-hero__title">An approach built<br /><em>on clarity and care.</em></h1>
          <p className="page-hero__sub">From first enquiry to a consistently clean home — here's what to expect.</p>
        </div>
      </section>

      <section className="approach-timeline">
        <div className="container">
          {steps.map((step, i) => (
            <div key={step.n} className={`approach-tl-row${i % 2 !== 0 ? ' approach-tl-row--reverse' : ''}`}>
              <ScrollReveal className="approach-tl-photo-wrap">
                <picture>
                  <source srcSet={IMG(step.img)} type="image/webp" />
                  <img src={IMG(step.img, 'jpg')} alt={step.alt} className="approach-tl-photo" loading={i === 0 ? 'eager' : 'lazy'} />
                </picture>
              </ScrollReveal>
              <ScrollReveal delay={150} className="approach-tl-text">
                <span className="approach-tl-num">{step.n}</span>
                <h2 className="approach-tl-title">{step.title}</h2>
                <p className="approach-tl-desc">{step.desc}</p>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </section>

      <section className="approach-principles">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow" style={{ textAlign: 'center' }}>Our Principles</p>
            <h2 className="approach-principles__heading">A few things we commit to.</h2>
          </ScrollReveal>
          <div className="approach-principles__grid">
            {[
              { icon: '◦', title: 'We confirm scope before we start', desc: 'No visit begins without clear agreement on what\'s included. This protects both of us.' },
              { icon: '◦', title: 'We bring what we need', desc: 'Supplies and equipment arrive with us. There\'s nothing you need to prepare or provide.' },
              { icon: '◦', title: 'We work without disruption', desc: 'You don\'t need to be home. We\'re flexible around your schedule and access preferences.' },
              { icon: '◦', title: 'We\'re easy to reach', desc: 'Questions or changes? Get in touch by phone or message and we\'ll respond promptly.' },
            ].map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 80}>
                <div className="approach-principle">
                  <span className="approach-principle__icon" aria-hidden="true">{p.icon}</span>
                  <h3 className="approach-principle__title">{p.title}</h3>
                  <p className="approach-principle__desc">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="page-cta">
        <div className="container page-cta__inner">
          <ScrollReveal>
            <h2 className="page-cta__heading">Ready to get started?</h2>
            <p className="page-cta__sub">Share a few details about your home and we'll take it from there.</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/quote" className="btn btn-primary">Request a Quote</Link>
              <Link to="/faq" className="btn" style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--evergreen)' }}>
                View FAQs
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
