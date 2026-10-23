import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import Photo from '../components/Photo'
import './Home.css'

const BA = (name: string) => `./assets/before-after/${name}.jpg`

const services = [
  {
    id: 'house',
    title: 'House Cleaning',
    desc: 'A comprehensive clean of the whole home — kitchen, bathrooms, living areas and bedrooms, each given the same systematic attention.',
    img: 'kitchen-counter-cleaning',
    alt: 'Kitchen counter and surfaces cleaned to a high standard',
  },
  {
    id: 'apartment',
    title: 'Apartment Cleaning',
    desc: 'Shaped around apartment and condo living, from studios to multi-bedroom units — making the most of every square foot.',
    img: 'bathroom-clean-interior',
    alt: 'Clean, bright apartment bathroom interior',
  },
  {
    id: 'recurring',
    title: 'Recurring Cleaning',
    desc: 'Weekly, bi-weekly or monthly visits on a schedule that suits you, so the upkeep never becomes something you think about.',
    img: 'bedroom-fresh-linens',
    alt: 'Bedroom with freshly made bed and clean linens',
  },
]

const steps = [
  { n: '01', title: 'Request a Quote', desc: 'Tell us about your home — its type, size, the areas that matter most to you, and any preferences or sensitivities we should know about.', img: 'cleaning-supplies', alt: 'Cleaning supplies prepared ahead of a visit' },
  { n: '02', title: 'Confirm Your Cleaning', desc: 'We follow up to talk through what is included and agree a clear scope before anything is booked. No assumptions, no surprises on the day.', img: 'faucet-detail', alt: 'Close detail of a polished tap and sink' },
  { n: '03', title: 'Professional Cleaning', desc: 'We work through your home methodically, giving each area the same unhurried care — whether it is a first visit or your fiftieth.', img: 'living-room-vacuuming', alt: 'Living room floor being carefully vacuumed' },
  { n: '04', title: 'Enjoy Your Space', desc: 'You come back to a home that has been genuinely looked after. For recurring clients, this simply becomes how the house always feels.', img: 'hero-calgary-living-room', alt: 'Calm, beautifully maintained Calgary living room' },
]

const comparisons = [
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'bathroom', label: 'Bathroom' },
  { id: 'living-room', label: 'Living Room' },
  { id: 'bedroom', label: 'Bedroom' },
]

const faqs = [
  { q: 'What areas of Calgary do you serve?', a: 'We serve Calgary and the surrounding communities. Get in touch and we will confirm whether your area is covered.' },
  { q: 'What cleaning services do you offer?', a: 'House cleaning, apartment cleaning, and recurring maintenance cleaning. If you are unsure which fits, the quote form is the easiest place to start.' },
  { q: 'Do I need to provide cleaning supplies?', a: 'No — we arrive with our own supplies and equipment. Let us know in advance if you have product preferences or sensitivities in the home.' },
  { q: 'How do I get a quote?', a: 'Use the quote form to share details about your home and what you are looking for. We follow up to confirm scope and scheduling before anything is booked.' },
  { q: 'Can I schedule recurring cleanings?', a: 'Yes. Many clients set up weekly, bi-weekly or monthly visits, and the frequency can be adjusted as your needs change.' },
]

type HomeType = '' | 'house' | 'apartment' | 'condo'
type Frequency = '' | 'once' | 'weekly' | 'biweekly' | 'monthly'

export default function Home() {
  const [activeStep, setActiveStep] = useState(0)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  const [activeComp, setActiveComp] = useState('kitchen')
  const current = comparisons.find(c => c.id === activeComp)!

  const [step, setStep] = useState(0)
  const [homeType, setHomeType] = useState<HomeType>('')
  const [bedrooms, setBedrooms] = useState('')
  const [summary, setSummary] = useState('')

  // Drive the sticky process imagery from whichever step is in view.
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = stepRefs.current.indexOf(entry.target as HTMLDivElement)
            if (idx !== -1) setActiveStep(idx)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    stepRefs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const buildSummary = (freq: Frequency) => {
    const typeLabel = homeType === 'house' ? 'house' : homeType === 'apartment' ? 'apartment' : 'condo'
    const freqLabel =
      freq === 'once' ? 'a one-time clean' :
      freq === 'weekly' ? 'weekly cleaning' :
      freq === 'biweekly' ? 'bi-weekly cleaning' : 'monthly cleaning'
    setSummary(`I would like ${freqLabel} for a ${bedrooms}-bedroom ${typeLabel} in Calgary. Please get in touch to discuss scope and availability.`)
    setStep(3)
  }

  const resetSelector = () => {
    setStep(0); setHomeType(''); setBedrooms(''); setSummary('')
  }

  return (
    <div className="home">

      {/* ═══ 1 · Hero — asymmetric split, no text over photography ═══ */}
      <section className="hero surf-evergreen" aria-label="Leads Cleaning">
        <div className="hero__grid">
          <div className="hero__field">
            <div className="hero__field-inner">
              <span className="eyebrow">Thoughtful home cleaning in Calgary</span>
              <h1 className="hero__headline">
                A Beautifully Clean&nbsp;Home.<br />
                <em>A Better Way to Live.</em>
              </h1>
              <p className="hero__sub">
                Thoughtful cleaning services for Calgary homes — bringing comfort,
                freshness and more time back into your day.
              </p>
              <div className="hero__ctas">
                <Link to="/quote" className="btn btn-bronze">Request Your Free Quote</Link>
                <Link to="/services" className="btn btn-ghost">Explore Our Services</Link>
              </div>
              <div className="hero__meta">
                <span>Houses · Apartments · Recurring</span>
                <a href="tel:+14036070581">+1 403-607-0581</a>
              </div>
            </div>
          </div>

          <div className="hero__panel">
            <Photo name="hero-calgary-living-room" alt="A calm, beautifully maintained Calgary living room" eager className="hero__photo" />
          </div>
        </div>
      </section>

      {/* ═══ 2 · Editorial — signature lifestyle statement ═══ */}
      <section className="editorial surf-ivory sec-xl" aria-label="A little more time for what matters">
        <div className="container editorial__grid">
          <ScrollReveal className="editorial__photo">
            <Photo name="calgary-entryway" alt="Sunlit entryway of a cared-for Calgary home" className="ph--zoom ar-tall" />
          </ScrollReveal>

          <ScrollReveal delay={140} className="editorial__text">
            <span className="eyebrow">The Leads Difference</span>
            <span className="rule" />
            <h2 className="editorial__heading">A Little More Time<br /><em>for What Matters.</em></h2>
            <p className="editorial__body">
              A beautifully maintained home changes how you experience everyday life.
              Less time worrying about cleaning. More time enjoying the space around you.
            </p>
            <p className="editorial__body editorial__body--muted">
              We work to one standard, every visit — the same care on your first
              appointment as on your fiftieth.
            </p>
            <Link to="/about" className="link-arrow">
              About Leads Cleaning <span aria-hidden="true">→</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ 3 · Services — one featured panel + asymmetric pair ═══ */}
      <section className="services surf-limestone sec-lg" aria-label="Our services">
        <div className="container">
          <ScrollReveal className="services__head">
            <div>
              <span className="eyebrow">What We Offer</span>
              <h2 className="services__heading">Three services,<br />shaped around your home.</h2>
            </div>
            <p className="services__intro">
              Every home asks for something slightly different. These are the three ways
              we work — each carried out with the same meticulous attention.
            </p>
          </ScrollReveal>

          {/* Featured */}
          <ScrollReveal delay={80}>
            <Link to="/services#house-cleaning" className="svc-feature">
              <div className="svc-feature__photo">
                <Photo name={services[0].img} alt={services[0].alt} className="ph--zoom" />
              </div>
              <div className="svc-feature__body">
                <span className="svc-feature__index">01 — Most requested</span>
                <h3 className="svc-feature__title">{services[0].title}</h3>
                <p className="svc-feature__desc">{services[0].desc}</p>
                <span className="link-arrow">Explore this service <span aria-hidden="true">→</span></span>
              </div>
            </Link>
          </ScrollReveal>

          {/* Asymmetric pair */}
          <div className="svc-pair">
            {services.slice(1).map((s, i) => (
              <ScrollReveal key={s.id} delay={120 + i * 100}>
                <Link to={`/services#${s.id}-cleaning`} className="svc-card">
                  <div className="svc-card__photo">
                    <Photo name={s.img} alt={s.alt} className="ph--zoom" />
                  </div>
                  <div className="svc-card__body">
                    <span className="svc-card__index">{`0${i + 2}`}</span>
                    <h3 className="svc-card__title">{s.title}</h3>
                    <p className="svc-card__desc">{s.desc}</p>
                    <span className="link-arrow">Learn more <span aria-hidden="true">→</span></span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 4 · Before & After — featured comparison on forest ═══ */}
      <section className="difference surf-forest sec-lg" aria-label="Before and after comparisons">
        <div className="container">
          <ScrollReveal className="difference__head">
            <span className="eyebrow">A Visible Difference</span>
            <h2 className="difference__heading">The Difference Is<br /><em>in the Details.</em></h2>
          </ScrollReveal>

          <ScrollReveal delay={100} className="difference__stage">
            <BeforeAfterSlider
              key={activeComp}
              before={BA(`${activeComp}-before`)}
              after={BA(`${activeComp}-after`)}
              beforeAlt={`${current.label} before cleaning`}
              afterAlt={`${current.label} after cleaning`}
              label={`${current.label} before and after comparison`}
              onDark
            />
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <div className="difference__selector" role="tablist" aria-label="Choose a room to compare">
              {comparisons.map(c => (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={activeComp === c.id}
                  className={`difference__thumb${activeComp === c.id ? ' difference__thumb--active' : ''}`}
                  onClick={() => setActiveComp(c.id)}
                >
                  <img src={BA(`${c.id}-after`)} alt="" aria-hidden="true" loading="lazy" />
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
            <p className="disclosure difference__disclosure">
              Illustrative concept images, not customer projects.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ 5 · Process — sticky imagery, editorial steps ═══ */}
      <section className="process surf-ivory sec-lg" aria-label="How it works">
        <div className="container">
          <ScrollReveal className="process__head">
            <span className="eyebrow">How It Works</span>
            <h2 className="process__heading">Effortless From First Contact<br /><em>to Final Detail.</em></h2>
          </ScrollReveal>

          <div className="process__grid">
            <div className="process__sticky" aria-hidden="true">
              <div className="process__stack">
                {steps.map((s, i) => (
                  <div key={s.n} className={`process__frame${activeStep === i ? ' process__frame--active' : ''}`}>
                    <Photo name={s.img} alt="" className="ar-tall" />
                  </div>
                ))}
              </div>
              <div className="process__progress">
                <span className="process__progress-now">{steps[activeStep].n}</span>
                <span className="process__progress-track">
                  <span className="process__progress-fill" style={{ transform: `scaleX(${(activeStep + 1) / steps.length})` }} />
                </span>
                <span className="process__progress-total">04</span>
              </div>
            </div>

            <ol className="process__steps">
              {steps.map((s, i) => (
                <li key={s.n}>
                  <div
                    ref={el => { stepRefs.current[i] = el }}
                    className={`process__step${activeStep === i ? ' process__step--active' : ''}`}
                  >
                    <div className="process__step-mobile-photo">
                      <Photo name={s.img} alt={s.alt} className="ar-wide" />
                    </div>
                    <span className="process__step-n">{s.n}</span>
                    <h3 className="process__step-title">{s.title}</h3>
                    <p className="process__step-desc">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <ScrollReveal>
            <div className="process__cta">
              <Link to="/approach" className="btn btn-ghost-dark">See Our Full Approach</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ 6 · Find your fit ═══ */}
      <section className="fit surf-limestone sec-md" aria-label="Find your cleaning fit">
        <div className="container fit__grid">
          <ScrollReveal className="fit__intro">
            <span className="eyebrow">Find Your Fit</span>
            <h2 className="fit__heading">Not sure where to start?</h2>
            <p className="fit__sub">
              Answer three short questions and we will put together an enquiry summary
              you can send straight through. No pricing is calculated — we confirm that
              with you directly.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={120} className="fit__card">
            {step < 3 ? (
              <>
                <div className="fit__progress">
                  {[0, 1, 2].map(i => (
                    <span key={i} className={`fit__dot${step >= i ? ' fit__dot--on' : ''}`} />
                  ))}
                </div>

                {step === 0 && (
                  <div className="fit__step">
                    <p className="fit__q">What type of home?</p>
                    <div className="fit__opts">
                      {(['house', 'apartment', 'condo'] as const).map(t => (
                        <button key={t} className="fit__opt" onClick={() => { setHomeType(t); setStep(1) }}>
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="fit__step">
                    <p className="fit__q">How many bedrooms?</p>
                    <div className="fit__opts">
                      {['1', '2', '3', '4+'].map(n => (
                        <button key={n} className="fit__opt" onClick={() => { setBedrooms(n); setStep(2) }}>{n}</button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="fit__step">
                    <p className="fit__q">How often?</p>
                    <div className="fit__opts">
                      {([['once', 'One-time'], ['weekly', 'Weekly'], ['biweekly', 'Bi-weekly'], ['monthly', 'Monthly']] as [Frequency, string][]).map(([v, l]) => (
                        <button key={v} className="fit__opt" onClick={() => buildSummary(v)}>{l}</button>
                      ))}
                    </div>
                  </div>
                )}

                {step > 0 && (
                  <button className="fit__back" onClick={() => setStep(s => s - 1)}>← Back</button>
                )}
              </>
            ) : (
              <div className="fit__result">
                <span className="eyebrow">Your Enquiry Summary</span>
                <blockquote className="fit__quote">{summary}</blockquote>
                <div className="fit__actions">
                  <Link to={`/quote?summary=${encodeURIComponent(summary)}`} className="btn btn-primary">
                    Use This in My Quote
                  </Link>
                  <button className="fit__reset" onClick={resetSelector}>Start over</button>
                </div>
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ 7 · FAQ ═══ */}
      <section className="faq-home surf-ivory sec-md" aria-label="Frequently asked questions">
        <div className="container faq-home__grid">
          <ScrollReveal className="faq-home__aside">
            <span className="eyebrow">Questions</span>
            <h2 className="faq-home__heading">Good to know<br />before you book.</h2>
            <Link to="/faq" className="link-arrow">All questions <span aria-hidden="true">→</span></Link>
          </ScrollReveal>

          <div className="faq-home__list">
            {faqs.map((f, i) => (
              <ScrollReveal key={i} delay={i * 50}>
                <details className="faq-item">
                  <summary className="faq-item__q">
                    <span>{f.q}</span>
                    <span className="faq-item__icon" aria-hidden="true" />
                  </summary>
                  <div className="faq-item__a"><p>{f.a}</p></div>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 8 · Closing CTA — solid evergreen, no photography ═══ */}
      <section className="closing surf-evergreen sec-lg" aria-label="Request a quote">
        <div className="container closing__inner">
          <ScrollReveal>
            <span className="eyebrow">Ready When You Are</span>
            <h2 className="closing__heading">Your Beautifully Clean<br /><em>Space Begins Here.</em></h2>
            <p className="closing__sub">
              Tell us about your home and we will be in touch to confirm scope,
              scheduling and everything else.
            </p>
            <div className="closing__actions">
              <Link to="/quote" className="btn btn-bronze">Request Your Free Quote</Link>
              <a href="tel:+14036070581" className="btn btn-ghost">Call +1 403-607-0581</a>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}
