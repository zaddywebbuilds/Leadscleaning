import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import './FAQ.css'

const faqs = [
  {
    cat: 'Booking',
    items: [
      { q: 'How do I get a quote?', a: 'Use the quote form on our website to share details about your home — size, type, frequency, and any specific requirements. We\'ll follow up to confirm scope and availability.' },
      { q: 'How far in advance do I need to book?', a: 'We recommend getting in touch a few days ahead where possible, though we\'ll always try to accommodate your timeline. Contact us to check current availability.' },
      { q: 'Can I schedule a one-time clean?', a: 'Yes. We offer one-time cleans for houses and apartments, alongside our recurring options.' },
      { q: 'What if I need to cancel or reschedule?', a: 'Please let us know as soon as possible if your plans change. We\'ll do our best to find an alternative time that works.' },
    ]
  },
  {
    cat: 'During the Visit',
    items: [
      { q: 'Do I need to be home during the cleaning?', a: 'Not at all. Many clients are out when we visit. We\'ll confirm access arrangements in advance.' },
      { q: 'Do you bring your own supplies?', a: 'Yes — we arrive with everything we need. You don\'t need to supply cleaning products or equipment.' },
      { q: 'What if I have pets or allergies?', a: 'Let us know in your quote request. We\'ll discuss any preferences or sensitivities and work with you to make sure the visit suits your household.' },
      { q: 'What areas of my home will be cleaned?', a: 'We agree scope before each visit. Typically this includes kitchens, bathrooms, living areas, bedrooms, and all floors — but we\'ll confirm the specific areas with you.' },
    ]
  },
  {
    cat: 'Services & Pricing',
    items: [
      { q: 'What cleaning services do you offer?', a: 'We currently offer house cleaning, apartment cleaning, and recurring maintenance cleaning for homes in Calgary.' },
      { q: 'Do you offer deep cleaning or move-out cleans?', a: 'Please get in touch to discuss your specific needs. We\'ll let you know whether it falls within our current service scope.' },
      { q: 'How is pricing determined?', a: 'Pricing depends on home size, the scope of work, and frequency. We\'ll provide a clear quote before confirming any booking — no hidden fees.' },
      { q: 'Are there long-term contracts for recurring cleaning?', a: 'No. We don\'t require long-term contracts. We work on a schedule that suits you, and you can adjust or pause at any time.' },
    ]
  },
  {
    cat: 'About Leads Cleaning',
    items: [
      { q: 'Where are you based?', a: 'We\'re based in Calgary, Alberta, and serve homes throughout the city and surrounding areas.' },
      { q: 'Are you insured?', a: 'Please contact us directly to discuss insurance and any related questions.' },
      { q: 'How do I get in touch?', a: 'By phone at +1 403-607-0581, or through the quote form on this site. We aim to respond promptly.' },
    ]
  },
]

export default function FAQ() {
  return (
    <div className="faq-page">
      <section className="page-hero page-hero--ivory">
        <div className="container">
          <p className="eyebrow">Good to Know</p>
          <h1 className="page-hero__title">Frequently asked<br /><em>questions.</em></h1>
          <p className="page-hero__sub">Everything you might want to know before booking.</p>
        </div>
      </section>

      <section className="faq-content">
        <div className="container faq-content__inner">
          <div className="faq-nav">
            {faqs.map(cat => (
              <a key={cat.cat} href={`#${cat.cat.replace(/\s+/g, '-').toLowerCase()}`} className="faq-nav__link">
                {cat.cat}
              </a>
            ))}
          </div>
          <div className="faq-sections">
            {faqs.map(cat => (
              <section key={cat.cat} id={cat.cat.replace(/\s+/g, '-').toLowerCase()} className="faq-cat">
                <ScrollReveal>
                  <h2 className="faq-cat__heading">{cat.cat}</h2>
                </ScrollReveal>
                <div className="faq-cat__items">
                  {cat.items.map((item, i) => (
                    <ScrollReveal key={i} delay={i * 50}>
                      <details className="faq-item">
                        <summary className="faq-item__q">{item.q}</summary>
                        <p className="faq-item__a">{item.a}</p>
                      </details>
                    </ScrollReveal>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="page-cta" style={{ background: 'var(--limestone)' }}>
        <div className="container page-cta__inner">
          <ScrollReveal>
            <h2 className="page-cta__heading">Still have questions?</h2>
            <p className="page-cta__sub">Get in touch — we're happy to help before you commit to anything.</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/quote" className="btn btn-primary">Request a Quote</Link>
              <a href="tel:+14036070581" className="btn" style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--evergreen)' }}>
                Call +1 403-607-0581
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
