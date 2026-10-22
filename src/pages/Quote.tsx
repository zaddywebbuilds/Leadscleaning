import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import './Quote.css'

type Step = 1 | 2 | 3 | 4 | 5

interface FormData {
  service: string
  homeType: string
  bedrooms: string
  bathrooms: string
  frequency: string
  area: string
  preferredDate: string
  notes: string
  name: string
  email: string
  phone: string
  contactPref: string
  consent: boolean
  honeypot: string
}

const empty: FormData = {
  service: '', homeType: '', bedrooms: '', bathrooms: '',
  frequency: '', area: '', preferredDate: '', notes: '',
  name: '', email: '', phone: '', contactPref: 'email',
  consent: false, honeypot: '',
}

export default function Quote() {
  const location = useLocation()
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState<FormData>(empty)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const summary = params.get('summary')
    if (summary) setForm(f => ({ ...f, notes: summary }))
  }, [location.search])

  const set = (key: keyof FormData, val: string | boolean) =>
    setForm(f => ({ ...f, [key]: val }))

  const validateStep = (): boolean => {
    const e: typeof errors = {}
    if (step === 1 && !form.service) e.service = 'Please select a service.'
    if (step === 2 && !form.homeType) e.homeType = 'Please select a home type.'
    if (step === 2 && !form.bedrooms) e.bedrooms = 'Please select bedrooms.'
    if (step === 3 && !form.frequency) e.frequency = 'Please select a frequency.'
    if (step === 4 && !form.area) e.area = 'Please enter your area or postcode.'
    if (step === 5) {
      if (!form.name.trim()) e.name = 'Name is required.'
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required.'
      if (!form.consent) e.consent = 'Please confirm your consent.'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => { if (validateStep()) setStep(s => Math.min(s + 1, 5) as Step) }
  const prev = () => { setStep(s => Math.max(s - 1, 1) as Step); setErrors({}) }

  const submit = () => {
    if (!validateStep()) return
    if (form.honeypot) return // spam
    const body = [
      `Service: ${form.service}`,
      `Home type: ${form.homeType}, Bedrooms: ${form.bedrooms}, Bathrooms: ${form.bathrooms}`,
      `Frequency: ${form.frequency}`,
      `Area: ${form.area}`,
      form.preferredDate ? `Preferred date: ${form.preferredDate}` : '',
      form.notes ? `Notes: ${form.notes}` : '',
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : '',
      `Contact preference: ${form.contactPref}`,
    ].filter(Boolean).join('\n')

    window.location.href = `mailto:info@leadscleaning.ca?subject=Quote Request from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="quote-page">
        <section className="quote-success">
          <div className="container">
            <div className="quote-success__card">
              <div className="quote-success__icon" aria-hidden="true">✓</div>
              <h1 className="quote-success__title">Your email app should have opened.</h1>
              <p>If it didn't open automatically, you can email us directly at <strong>+1 403-607-0581</strong> or use the contact details below.</p>
              <p className="quote-success__note">We aim to respond within one business day.</p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  const steps = ['Service', 'Your Home', 'Frequency & Location', 'Preferences', 'Contact']

  return (
    <div className="quote-page">
      <section className="page-hero page-hero--limestone">
        <div className="container">
          <p className="eyebrow">Get a Quote</p>
          <h1 className="page-hero__title">Tell us about<br /><em>your home.</em></h1>
          <p className="page-hero__sub">A few quick questions so we can get back to you with the right details.</p>
        </div>
      </section>

      <section className="quote-form-section">
        <div className="container">
          <ScrollReveal>
            {/* Progress */}
            <nav className="quote-progress" aria-label="Quote form progress">
              {steps.map((s, i) => (
                <div key={s} className={`quote-progress__step${step > i + 1 ? ' quote-progress__step--done' : step === i + 1 ? ' quote-progress__step--active' : ''}`}>
                  <span className="quote-progress__dot">{step > i + 1 ? '✓' : i + 1}</span>
                  <span className="quote-progress__label">{s}</span>
                </div>
              ))}
            </nav>

            <div className="quote-card">
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={form.honeypot}
                onChange={e => set('honeypot', e.target.value)}
                tabIndex={-1}
                aria-hidden="true"
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
              />

              {/* Step 1 — Service */}
              {step === 1 && (
                <fieldset className="quote-step">
                  <legend className="quote-step__legend">Which service are you looking for?</legend>
                  <div className="quote-options">
                    {['House Cleaning', 'Apartment Cleaning', 'Recurring Cleaning', 'Not sure yet'].map(s => (
                      <label key={s} className={`quote-option${form.service === s ? ' quote-option--active' : ''}`}>
                        <input type="radio" name="service" value={s} checked={form.service === s} onChange={() => set('service', s)} />
                        {s}
                      </label>
                    ))}
                  </div>
                  {errors.service && <p className="quote-error" role="alert">{errors.service}</p>}
                </fieldset>
              )}

              {/* Step 2 — Home */}
              {step === 2 && (
                <fieldset className="quote-step">
                  <legend className="quote-step__legend">Tell us about your home.</legend>
                  <div className="quote-field-group">
                    <div className="quote-field">
                      <label className="quote-label">Home type</label>
                      <div className="quote-options">
                        {['House', 'Apartment', 'Condo', 'Townhouse'].map(t => (
                          <label key={t} className={`quote-option${form.homeType === t ? ' quote-option--active' : ''}`}>
                            <input type="radio" name="homeType" value={t} checked={form.homeType === t} onChange={() => set('homeType', t)} />
                            {t}
                          </label>
                        ))}
                      </div>
                      {errors.homeType && <p className="quote-error" role="alert">{errors.homeType}</p>}
                    </div>
                    <div className="quote-row">
                      <div className="quote-field">
                        <label className="quote-label" htmlFor="bedrooms">Bedrooms</label>
                        <select id="bedrooms" className="quote-select" value={form.bedrooms} onChange={e => set('bedrooms', e.target.value)}>
                          <option value="">Select</option>
                          {['Studio', '1', '2', '3', '4', '5+'].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                        {errors.bedrooms && <p className="quote-error" role="alert">{errors.bedrooms}</p>}
                      </div>
                      <div className="quote-field">
                        <label className="quote-label" htmlFor="bathrooms">Bathrooms</label>
                        <select id="bathrooms" className="quote-select" value={form.bathrooms} onChange={e => set('bathrooms', e.target.value)}>
                          <option value="">Select</option>
                          {['1', '1.5', '2', '2.5', '3', '3+'].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                </fieldset>
              )}

              {/* Step 3 — Frequency & Location */}
              {step === 3 && (
                <fieldset className="quote-step">
                  <legend className="quote-step__legend">How often, and where?</legend>
                  <div className="quote-field-group">
                    <div className="quote-field">
                      <label className="quote-label">Cleaning frequency</label>
                      <div className="quote-options">
                        {['One-time', 'Weekly', 'Bi-weekly', 'Monthly', 'Not sure yet'].map(f => (
                          <label key={f} className={`quote-option${form.frequency === f ? ' quote-option--active' : ''}`}>
                            <input type="radio" name="frequency" value={f} checked={form.frequency === f} onChange={() => set('frequency', f)} />
                            {f}
                          </label>
                        ))}
                      </div>
                      {errors.frequency && <p className="quote-error" role="alert">{errors.frequency}</p>}
                    </div>
                    <div className="quote-field">
                      <label className="quote-label" htmlFor="area">Your area or postal code</label>
                      <input
                        id="area"
                        type="text"
                        className="quote-input"
                        placeholder="e.g. Beltline, T2P 1A1"
                        value={form.area}
                        onChange={e => set('area', e.target.value)}
                      />
                      {errors.area && <p className="quote-error" role="alert">{errors.area}</p>}
                    </div>
                  </div>
                </fieldset>
              )}

              {/* Step 4 — Preferences */}
              {step === 4 && (
                <fieldset className="quote-step">
                  <legend className="quote-step__legend">Any preferences or priorities?</legend>
                  <div className="quote-field-group">
                    <div className="quote-field">
                      <label className="quote-label" htmlFor="preferredDate">Preferred date (optional)</label>
                      <input
                        id="preferredDate"
                        type="date"
                        className="quote-input"
                        value={form.preferredDate}
                        onChange={e => set('preferredDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="quote-field">
                      <label className="quote-label" htmlFor="notes">Notes or priorities</label>
                      <textarea
                        id="notes"
                        className="quote-textarea"
                        rows={4}
                        placeholder="e.g. We have a dog, focus on bathrooms and kitchen, allergic to strong scents…"
                        value={form.notes}
                        onChange={e => set('notes', e.target.value)}
                      />
                    </div>
                  </div>
                </fieldset>
              )}

              {/* Step 5 — Contact */}
              {step === 5 && (
                <fieldset className="quote-step">
                  <legend className="quote-step__legend">How should we reach you?</legend>
                  <div className="quote-field-group">
                    <div className="quote-row">
                      <div className="quote-field">
                        <label className="quote-label" htmlFor="name">Full name *</label>
                        <input id="name" type="text" className="quote-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your name" autoComplete="name" />
                        {errors.name && <p className="quote-error" role="alert">{errors.name}</p>}
                      </div>
                    </div>
                    <div className="quote-row">
                      <div className="quote-field">
                        <label className="quote-label" htmlFor="email">Email *</label>
                        <input id="email" type="email" className="quote-input" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" autoComplete="email" />
                        {errors.email && <p className="quote-error" role="alert">{errors.email}</p>}
                      </div>
                      <div className="quote-field">
                        <label className="quote-label" htmlFor="phone">Phone (optional)</label>
                        <input id="phone" type="tel" className="quote-input" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+1 403 000 0000" autoComplete="tel" />
                      </div>
                    </div>
                    <div className="quote-field">
                      <label className="quote-label">Preferred contact method</label>
                      <div className="quote-options">
                        {['email', 'phone', 'either'].map(p => (
                          <label key={p} className={`quote-option${form.contactPref === p ? ' quote-option--active' : ''}`}>
                            <input type="radio" name="contactPref" value={p} checked={form.contactPref === p} onChange={() => set('contactPref', p)} />
                            {p.charAt(0).toUpperCase() + p.slice(1)}
                          </label>
                        ))}
                      </div>
                    </div>
                    <label className="quote-consent">
                      <input type="checkbox" checked={form.consent} onChange={e => set('consent', e.target.checked)} />
                      <span>I agree to be contacted by Leads Cleaning regarding my enquiry. We won't share your details with third parties.</span>
                    </label>
                    {errors.consent && <p className="quote-error" role="alert">{errors.consent}</p>}
                    <p className="quote-mailto-note">
                      Submitting will open your default email app with your enquiry pre-filled, addressed to Leads Cleaning. No data is submitted directly through this form.
                    </p>
                  </div>
                </fieldset>
              )}

              {/* Navigation */}
              <div className="quote-nav">
                {step > 1 && (
                  <button type="button" className="quote-back" onClick={prev}>← Back</button>
                )}
                {step < 5 ? (
                  <button type="button" className="btn btn-primary quote-next" onClick={next}>Continue</button>
                ) : (
                  <button type="button" className="btn btn-primary quote-next" onClick={submit}>Open Email App →</button>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
