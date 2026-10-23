import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import Photo from '../components/Photo'
import './FAQ.css'

const groups = [
  {
    group: 'Services & Scope',
    items: [
      { q: 'What cleaning services do you offer?', a: 'House cleaning, apartment cleaning, and recurring maintenance cleaning. If you are not sure which fits your situation, the quote form is the easiest place to start — we will suggest the right option.' },
      { q: 'What is included in a standard clean?', a: 'Typically kitchen surfaces and fixtures, bathrooms, living and dining areas, bedrooms, and floors throughout. Exact inclusions are confirmed with you before the visit so there are no assumptions on either side.' },
      { q: 'Do you clean inside appliances or windows?', a: 'These fall outside a standard visit. Mention them when you request a quote and we will confirm whether we can include them and what that involves.' },
      { q: 'Can I ask you to focus on particular areas?', a: 'Yes. If certain rooms or tasks matter more to you, say so up front and we will shape the scope around that.' },
    ],
  },
  {
    group: 'Booking & Scheduling',
    items: [
      { q: 'How do I get a quote?', a: 'Use the quote form to share details about your home and what you are looking for. We follow up to confirm scope and scheduling before anything is booked.' },
      { q: 'Can I schedule recurring cleanings?', a: 'Yes. Many clients set up weekly, bi-weekly or monthly visits. The frequency can be adjusted as your needs change.' },
      { q: 'What if I need to reschedule?', a: 'We ask for as much notice as you can give. Reach us by phone or through the quote form and we will find another time.' },
      { q: 'Do I need to be home during the clean?', a: 'Not necessarily. Access arrangements are agreed in advance — whatever you are comfortable with.' },
    ],
  },
  {
    group: 'Practical Details',
    items: [
      { q: 'What areas of Calgary do you serve?', a: 'Calgary and the surrounding communities. Get in touch and we will confirm whether your area is covered.' },
      { q: 'Do I need to provide cleaning supplies?', a: 'No — we arrive with our own supplies and equipment. Let us know in advance if you have product preferences or sensitivities in the home.' },
      { q: 'How do payments work?', a: 'Payment terms are confirmed along with your quote before the first visit. Details are agreed in writing so nothing is ambiguous.' },
    ],
  },
]

export default function FAQ() {
  return (
    <div className="faq-page">

      <section className="page-hero page-hero--split surf-limestone">
        <div className="container page-hero__grid">
          <div>
            <span className="eyebrow page-hero__eyebrow">Questions</span>
            <span className="rule" />
            <h1 className="page-hero__title">Everything worth <em>knowing first.</em></h1>
            <p className="page-hero__sub">
              The things clients most often ask before booking. If your question is not
              here, call or send it through the quote form.
            </p>
          </div>
          <div className="page-hero__panel">
            <Photo name="bathroom-clean-interior" alt="Clean, bright bathroom interior" eager className="ar-landscape" />
          </div>
        </div>
      </section>

      <section className="faq-body surf-ivory sec-lg">
        <div className="container">
          {groups.map((g, gi) => (
            <div key={g.group} className="faq-group">
              <ScrollReveal className="faq-group__aside">
                <span className="faq-group__num">{String(gi + 1).padStart(2, '0')}</span>
                <h2 className="faq-group__title">{g.group}</h2>
              </ScrollReveal>

              <div className="faq-group__items">
                {g.items.map((item, i) => (
                  <ScrollReveal key={item.q} delay={i * 50}>
                    <details className="faq-item">
                      <summary className="faq-item__q">
                        <span>{item.q}</span>
                        <span className="faq-item__icon" aria-hidden="true" />
                      </summary>
                      <div className="faq-item__a"><p>{item.a}</p></div>
                    </details>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-cta surf-evergreen">
        <div className="container page-cta__inner">
          <ScrollReveal>
            <span className="eyebrow">Still Wondering?</span>
            <h2 className="page-cta__heading">Ask us directly.</h2>
            <p className="page-cta__sub lede">
              Call during business hours or send your question through the quote form —
              whichever is easier.
            </p>
            <div className="page-cta__actions">
              <Link to="/quote" className="btn btn-bronze">Request a Quote</Link>
              <a href="tel:+14036070581" className="btn btn-ghost">Call +1 403-607-0581</a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
