import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import './Home.css'
import { useState } from 'react'

const IMG = (name: string, ext = 'webp') => `./assets/photos/${name}.${ext}`
const BA = (name: string) => `./assets/before-after/${name}.jpg`

const faqs = [
  { q: 'What areas of Calgary do you serve?', a: 'We serve Calgary and surrounding communities. Contact us to confirm your area.' },
  { q: 'What cleaning services do you offer?', a: 'We offer house cleaning, apartment cleaning, and recurring maintenance cleaning. Get in touch to discuss your specific needs.' },
  { q: 'Do I need to provide cleaning supplies?', a: 'No — we bring our own supplies and equipment. Let us know if you have any preferences or sensitivities.' },
  { q: 'How do I get a quote?', a: 'Use our quote form to share details about your home and preferences. We\'ll follow up to confirm scope and scheduling.' },
  { q: 'Can I schedule recurring cleanings?', a: 'Yes. Many clients set up weekly, bi-weekly, or monthly visits. We\'ll work with your schedule.' },
  { q: 'What if I need to reschedule?', a: 'We ask for as much notice as possible. Reach us by phone or through the quote form to adjust your booking.' },
]

type HomeType = '' | 'house' | 'apartment' | 'condo'
type Frequency = '' | 'once' | 'weekly' | 'biweekly' | 'monthly'

export default function Home() {
  const [selectorStep, setSelectorStep] = useState(0)
  const [homeType, setHomeType] = useState<HomeType>('')
  const [bedrooms, setBedrooms] = useState('')
  const [frequency, setFrequency] = useState<Frequency>('')
  const [summary, setSummary] = useState('')

  const generateSummary = () => {
    if (!homeType || !bedrooms || !frequency) return
    const typeLabel = homeType === 'house' ? 'House' : homeType === 'apartment' ? 'Apartment' : 'Condo'
    const freqLabel = frequency === 'once' ? 'one-time' : frequency
    setSummary(`I'm looking for ${freqLabel} cleaning for a ${bedrooms}-bedroom ${typeLabel} in Calgary. Please get in touch to discuss details and availability.`)
    setSelectorStep(3)
  }

  return (
    <div className="home">

      {/* 1 — Hero */}
      <section className="hero" aria-label="Hero">
        <div className="hero__bg">
          <picture>
            <source srcSet={IMG('hero-calgary-living-room')} type="image/webp" />
            <img src={IMG('hero-calgary-living-room', 'jpg')} alt="Beautifully maintained Calgary living room" className="hero__img" />
          </picture>
          <div className="hero__overlay" />
        </div>
        <div className="container hero__content">
          <p className="eyebrow hero__eyebrow">Thoughtful home cleaning in Calgary</p>
          <h1 className="hero__headline">Come Home to a Better Kind of Clean.</h1>
          <p className="hero__sub">A beautifully maintained home makes room for everything else.</p>
          <div className="hero__ctas">
            <Link to="/quote" className="btn btn-primary">Request My Quote</Link>
            <Link to="/services" className="btn btn-outline">Explore Cleaning Services</Link>
          </div>
        </div>
        <div className="hero__scroll-cue" aria-hidden="true">
          <span />
        </div>
      </section>

      {/* 2 — Editorial intro */}
      <section className="editorial">
        <div className="container editorial__inner">
          <ScrollReveal className="editorial__text">
            <p className="eyebrow">The Leads Difference</p>
            <h2 className="editorial__heading">A little more room<br /><em>to live.</em></h2>
            <p className="editorial__body">
              We believe your home should be a place of ease — not another thing on your list.
              Every visit is carried out with the same careful attention to detail, whether it's
              your first time or your fiftieth.
            </p>
            <Link to="/about" className="editorial__link">
              Learn about us <span aria-hidden="true">→</span>
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={150} className="editorial__photo-wrap">
            <picture>
              <source srcSet={IMG('faucet-detail')} type="image/webp" />
              <img src={IMG('faucet-detail', 'jpg')} alt="Detailed faucet cleaning — precision work" className="editorial__photo" />
            </picture>
            <div className="editorial__photo-accent" />
          </ScrollReveal>
        </div>
      </section>

      {/* 3 — Services tiles */}
      <section className="services-tiles" aria-label="Our services">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow" style={{ textAlign: 'center' }}>What We Offer</p>
            <h2 className="services-tiles__heading">Cleaning that fits your home.</h2>
          </ScrollReveal>
          <div className="services-tiles__grid">
            {[
              { title: 'House Cleaning', desc: 'Comprehensive care for every room — kitchens, bathrooms, living areas, and bedrooms.', img: 'kitchen-counter-cleaning', alt: 'Clean kitchen counter' },
              { title: 'Apartment Cleaning', desc: 'Tailored for apartment living, from studio to multi-bedroom, with attention to smaller spaces.', img: 'bathroom-clean-interior', alt: 'Clean apartment bathroom' },
              { title: 'Recurring Cleaning', desc: 'Weekly, bi-weekly, or monthly visits so your home stays consistently fresh without effort.', img: 'bedroom-fresh-linens', alt: 'Fresh bedroom with clean linens' },
            ].map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 100}>
                <Link to="/services" className="service-tile">
                  <div className="service-tile__img-wrap">
                    <picture>
                      <source srcSet={IMG(s.img)} type="image/webp" />
                      <img src={IMG(s.img, 'jpg')} alt={s.alt} className="service-tile__img" loading="lazy" />
                    </picture>
                  </div>
                  <div className="service-tile__body">
                    <h3 className="service-tile__title">{s.title}</h3>
                    <p className="service-tile__desc">{s.desc}</p>
                    <span className="service-tile__cta">Learn more <span aria-hidden="true">→</span></span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — The Details Matter */}
      <section className="details" aria-label="The details matter">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">Our Standard</p>
            <h2 className="details__heading">The Details Matter.</h2>
          </ScrollReveal>
          {[
            { img: 'cabinet-detail-cleaning', alt: 'Cabinet handles carefully wiped down', title: 'Every surface considered.', body: 'We don\'t skip the edges. Cabinet faces, door frames, light switches — the small things that quietly matter.' },
            { img: 'faucet-detail', alt: 'Faucet and sink detailing', title: 'Fixtures left spotless.', body: 'Taps, handles and fixtures get the kind of attention that makes a bathroom feel genuinely cared for.' },
            { img: 'living-room-vacuuming', alt: 'Living room being carefully vacuumed', title: 'Floors you notice.', body: 'Careful vacuuming, attentive to edges, furniture legs, and the spaces in between.' },
          ].map((d, i) => (
            <div key={d.title} className={`details__row details__row--${i % 2 === 0 ? 'normal' : 'reverse'}`}>
              <ScrollReveal delay={100} className="details__img-wrap">
                <picture>
                  <source srcSet={IMG(d.img)} type="image/webp" />
                  <img src={IMG(d.img, 'jpg')} alt={d.alt} className="details__img" loading="lazy" />
                </picture>
              </ScrollReveal>
              <ScrollReveal delay={200} className="details__text">
                <h3 className="details__title">{d.title}</h3>
                <p className="details__body">{d.body}</p>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </section>

      {/* 5 — Our Approach */}
      <section className="approach-preview" aria-label="Our approach">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow" style={{ textAlign: 'center' }}>How It Works</p>
            <h2 className="approach-preview__heading">From first message to fresh home.</h2>
          </ScrollReveal>
          <div className="approach-steps">
            {[
              { n: '01', title: 'Tell us about your space', desc: 'Share your home type, size, and what matters most to you.' },
              { n: '02', title: 'Confirm your scope', desc: 'We\'ll discuss what\'s included and agree on a clear approach before anything begins.' },
              { n: '03', title: 'We clean thoughtfully', desc: 'Your home receives attentive, systematic care — nothing rushed, nothing overlooked.' },
              { n: '04', title: 'Come home to refreshed spaces', desc: 'Return to a home that feels exactly as it should: calm, clean, and yours.' },
            ].map((step, i) => (
              <ScrollReveal key={step.n} delay={i * 80} className="approach-step">
                <span className="approach-step__number">{step.n}</span>
                <h3 className="approach-step__title">{step.title}</h3>
                <p className="approach-step__desc">{step.desc}</p>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link to="/approach" className="btn btn-primary">See Our Full Approach</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6 — Before/After */}
      <section className="baf-section" aria-label="Before and after results">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow" style={{ textAlign: 'center' }}>A Visible Difference</p>
            <h2 className="baf-section__heading">See the transformation.</h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="baf-section__slider-wrap">
              <BeforeAfterSlider
                before={BA('kitchen-before')}
                after={BA('kitchen-after')}
                beforeAlt="Kitchen before cleaning"
                afterAlt="Kitchen after cleaning"
                label="Kitchen before and after cleaning comparison"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link to="/results" className="btn btn-primary">View All Comparisons</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 7 — Find your cleaning fit */}
      <section className="selector" aria-label="Find your cleaning fit">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow" style={{ textAlign: 'center' }}>Find Your Fit</p>
            <h2 className="selector__heading">Not sure where to start?</h2>
            <p className="selector__sub">Answer three quick questions and we'll put together an enquiry for you.</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="selector__card">
              {selectorStep < 3 ? (
                <>
                  {selectorStep === 0 && (
                    <div className="selector__step">
                      <p className="selector__question">What type of home?</p>
                      <div className="selector__options">
                        {(['house', 'apartment', 'condo'] as HomeType[]).map(t => (
                          <button key={t} className={`selector__opt${homeType === t ? ' selector__opt--active' : ''}`} onClick={() => { setHomeType(t); setSelectorStep(1) }}>
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectorStep === 1 && (
                    <div className="selector__step">
                      <p className="selector__question">How many bedrooms?</p>
                      <div className="selector__options">
                        {['1', '2', '3', '4+'].map(n => (
                          <button key={n} className={`selector__opt${bedrooms === n ? ' selector__opt--active' : ''}`} onClick={() => { setBedrooms(n); setSelectorStep(2) }}>
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectorStep === 2 && (
                    <div className="selector__step">
                      <p className="selector__question">How often?</p>
                      <div className="selector__options">
                        {([['once', 'One-time'], ['weekly', 'Weekly'], ['biweekly', 'Bi-weekly'], ['monthly', 'Monthly']] as [Frequency, string][]).map(([v, l]) => (
                          <button key={v} className={`selector__opt${frequency === v ? ' selector__opt--active' : ''}`} onClick={() => { setFrequency(v); setSelectorStep(2.5 as never) }}>
                            {l}
                          </button>
                        ))}
                      </div>
                      <button className="selector__generate btn btn-primary" onClick={generateSummary} disabled={!frequency}>
                        Generate My Enquiry
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="selector__result">
                  <p className="selector__result-label eyebrow">Your Enquiry Summary</p>
                  <blockquote className="selector__result-text">"{summary}"</blockquote>
                  <div className="selector__result-actions">
                    <Link to={`/quote?summary=${encodeURIComponent(summary)}`} className="btn btn-primary">Use This in My Quote</Link>
                    <button className="selector__reset" onClick={() => { setSelectorStep(0); setHomeType(''); setBedrooms(''); setFrequency(''); setSummary('') }}>Start Over</button>
                  </div>
                </div>
              )}
              {selectorStep > 0 && selectorStep < 3 && (
                <button className="selector__back" onClick={() => setSelectorStep(s => s - 1)}>← Back</button>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 8 — FAQ */}
      <section className="home-faq" aria-label="Frequently asked questions">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow" style={{ textAlign: 'center' }}>Questions</p>
            <h2 className="home-faq__heading">Good to know before you book.</h2>
          </ScrollReveal>
          <div className="home-faq__list">
            {faqs.map((f, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <details className="faq-item">
                  <summary className="faq-item__q">{f.q}</summary>
                  <p className="faq-item__a">{f.a}</p>
                </details>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link to="/faq" className="btn btn-primary">View All FAQs</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 9 — CTA */}
      <section className="cta-band" aria-label="Get a quote">
        <div className="cta-band__bg">
          <picture>
            <source srcSet={IMG('calgary-entryway')} type="image/webp" />
            <img src={IMG('calgary-entryway', 'jpg')} alt="Clean Calgary home entryway" className="cta-band__img" loading="lazy" />
          </picture>
          <div className="cta-band__overlay" />
        </div>
        <div className="container cta-band__content">
          <ScrollReveal>
            <p className="eyebrow" style={{ color: 'var(--bronze)' }}>Ready When You Are</p>
            <h2 className="cta-band__heading">Your home deserves this.</h2>
            <p className="cta-band__sub">Tell us about your space and we'll be in touch to confirm the details.</p>
            <div className="cta-band__actions">
              <Link to="/quote" className="btn btn-bronze">Request My Quote</Link>
              <a href="tel:+14036070581" className="btn btn-outline">Call +1 403-607-0581</a>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}
