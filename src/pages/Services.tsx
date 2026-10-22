import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import './Services.css'

const IMG = (name: string, ext = 'webp') => `./assets/photos/${name}.${ext}`

export default function Services() {
  return (
    <div className="services-page">
      <section className="page-hero page-hero--limestone">
        <div className="container">
          <p className="eyebrow">What We Offer</p>
          <h1 className="page-hero__title">Cleaning services<br /><em>designed around your home.</em></h1>
          <p className="page-hero__sub">Three focused services — each carried out with the same meticulous care.</p>
        </div>
      </section>

      {/* House Cleaning */}
      <section className="svc-detail" id="house-cleaning">
        <div className="container svc-detail__inner">
          <ScrollReveal className="svc-detail__photo-wrap">
            <picture>
              <source srcSet={IMG('kitchen-counter-cleaning')} type="image/webp" />
              <img src={IMG('kitchen-counter-cleaning', 'jpg')} alt="Kitchen cleaned to a high standard" className="svc-detail__photo" loading="lazy" />
            </picture>
          </ScrollReveal>
          <ScrollReveal delay={120} className="svc-detail__text">
            <p className="eyebrow">Service 01</p>
            <h2 className="svc-detail__title">House Cleaning</h2>
            <p className="svc-detail__body">
              A comprehensive clean of your entire home — from kitchen to bedrooms,
              bathrooms to living areas. Each room receives systematic, attentive care
              that leaves your home feeling refreshed from top to bottom.
            </p>
            <ul className="svc-detail__list">
              <li>Kitchen surfaces, appliance exteriors, sink and fixtures</li>
              <li>Bathroom cleaning including fixtures, surfaces and mirrors</li>
              <li>Living and dining areas — dusting, vacuuming, tidying</li>
              <li>Bedroom cleaning and bed making (linens provided by client)</li>
              <li>Floors throughout — sweep, mop or vacuum as appropriate</li>
            </ul>
            <p className="svc-detail__note">Specific inclusions confirmed with each client before visit.</p>
            <Link to="/quote" className="btn btn-primary">Request a Quote</Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Apartment Cleaning */}
      <section className="svc-detail svc-detail--alt" id="apartment-cleaning">
        <div className="container svc-detail__inner svc-detail__inner--reverse">
          <ScrollReveal className="svc-detail__photo-wrap">
            <picture>
              <source srcSet={IMG('bathroom-clean-interior')} type="image/webp" />
              <img src={IMG('bathroom-clean-interior', 'jpg')} alt="Clean apartment bathroom" className="svc-detail__photo" loading="lazy" />
            </picture>
          </ScrollReveal>
          <ScrollReveal delay={120} className="svc-detail__text">
            <p className="eyebrow">Service 02</p>
            <h2 className="svc-detail__title">Apartment Cleaning</h2>
            <p className="svc-detail__body">
              Tailored for apartment and condo living — from studios to multi-bedroom units.
              We understand the unique demands of apartment spaces and adapt our approach
              to make the most of every area.
            </p>
            <ul className="svc-detail__list">
              <li>Full kitchen and bathroom cleaning</li>
              <li>Living and sleeping area care</li>
              <li>Balcony wipe-down (where accessible)</li>
              <li>All floor surfaces — hardwood, tile or carpet</li>
            </ul>
            <p className="svc-detail__note">We work around building access, parking, and lobby requirements.</p>
            <Link to="/quote" className="btn btn-primary">Request a Quote</Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Recurring Cleaning */}
      <section className="svc-detail" id="recurring-cleaning">
        <div className="container svc-detail__inner">
          <ScrollReveal className="svc-detail__photo-wrap">
            <picture>
              <source srcSet={IMG('bedroom-fresh-linens')} type="image/webp" />
              <img src={IMG('bedroom-fresh-linens', 'jpg')} alt="Bedroom with freshly made bed and clean space" className="svc-detail__photo" loading="lazy" />
            </picture>
          </ScrollReveal>
          <ScrollReveal delay={120} className="svc-detail__text">
            <p className="eyebrow">Service 03</p>
            <h2 className="svc-detail__title">Recurring Cleaning</h2>
            <p className="svc-detail__body">
              The most effortless way to maintain a home you're proud of. Set a regular
              schedule — weekly, bi-weekly, or monthly — and let us handle the upkeep
              so you never have to think about it.
            </p>
            <ul className="svc-detail__list">
              <li>Consistent scope agreed at outset</li>
              <li>Same standard of care each visit</li>
              <li>Flexible scheduling around your life</li>
              <li>Easy to adjust frequency as needed</li>
            </ul>
            <p className="svc-detail__note">Recurring clients are prioritised for scheduling. Contact us to discuss your preferred cadence.</p>
            <Link to="/quote" className="btn btn-primary">Set Up Regular Cleaning</Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Also included */}
      <section className="svc-also">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow" style={{ textAlign: 'center' }}>Within Every Visit</p>
            <h2 className="svc-also__heading">Rooms we always attend to.</h2>
          </ScrollReveal>
          <div className="svc-also__grid">
            {[
              { img: 'cabinet-detail-cleaning', alt: 'Cabinet detail work', title: 'Kitchen Details', desc: 'Surfaces, cabinet fronts, and fixtures cleaned with care.' },
              { img: 'faucet-detail', alt: 'Faucet and fixture polishing', title: 'Bathroom Fixtures', desc: 'Taps, faucets, mirrors and surfaces left spotless.' },
              { img: 'living-room-vacuuming', alt: 'Living room being vacuumed', title: 'Living Spaces', desc: 'Floors, surfaces and furniture attended to thoroughly.' },
              { img: 'cleaning-supplies', alt: 'Professional cleaning supplies ready for use', title: 'Prepared Every Time', desc: 'We arrive with everything needed — no setup required from you.' },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 80}>
                <div className="svc-also-card">
                  <picture>
                    <source srcSet={IMG(item.img)} type="image/webp" />
                    <img src={IMG(item.img, 'jpg')} alt={item.alt} className="svc-also-card__img" loading="lazy" />
                  </picture>
                  <h3 className="svc-also-card__title">{item.title}</h3>
                  <p className="svc-also-card__desc">{item.desc}</p>
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
            <p className="page-cta__sub">Tell us about your home and we'll be in touch to confirm the details.</p>
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
