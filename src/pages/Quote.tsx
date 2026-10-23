import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import './Quote.css'

/** Owner to confirm before launch — see README. */
const CONTACT_EMAIL = 'info@leadscleaning.ca'
const CONTACT_PHONE = '+1 403-607-0581'

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

const stepNames = ['Service', 'Your Home', 'Frequency', 'Preferences', 'Contact']

export default function Quote() {
  const location = useLocation()
  const [step, setStep] = useState<Step>(1)
  // Seed `notes` from a ?summary= handed over by the home-page fit selector.
  const [form, setForm] = useState<FormData>(() => {
    const summary = new URLSearchParams(location.search).get('summary')
    return summary ? { ...empty, notes: summary } : empty
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const set = (key: keyof FormData, val: string | boolean) => {
    setForm(f => ({ ...f, [key]: val }))
    setErrors(e => ({ ...e, [key]: undefined }))
  }

  const validate = (): boolean => {
    const e: typeof errors = {}
    if (step === 1 && !form.service) e.service = 'Please choose a service.'
    if (step === 2) {
      if (!form.homeType) e.homeType = 'Please choose a home type.'
      if (!form.bedrooms) e.bedrooms = 'Please choose the number of bedrooms.'
    }
    if (step === 3 && !form.frequency) e.frequency = 'Please choose a frequency.'
    if (step === 4 && !form.area.trim()) e.area = 'Please enter your area or postal code.'
    if (step === 5) {
      if (!form.name.trim()) e.name = 'Please enter your name.'
      if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email address.'
      if (!form.consent) e.consent = 'Please confirm before sending.'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => { if (validate()) setStep(s => Math.min(s + 1, 5) as Step) }
  const prev = () => { setErrors({}); setStep(s => Math.max(s - 1, 1) as Step) }

  const submit = () => {
    if (!validate()) return
    if (form.honeypot) return

    const body = [
      `Service: ${form.service}`,
      `Home type: ${form.homeType}`,
      `Bedrooms: ${form.bedrooms}${form.bathrooms ? `, Bathrooms: ${form.bathrooms}` : ''}`,
      `Frequency: ${form.frequency}`,
      `Area / postal code: ${form.area}`,
      form.preferredDate ? `Preferred date: ${form.preferredDate}` : '',
      form.notes ? `\nNotes:\n${form.notes}` : '',
      `\nName: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : '',
      `Preferred contact: ${form.contactPref}`,
    ].filter(Boolean).join('\n')

    window.location.href =
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Quote request — ${form.name}`)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="quote-page">
        <section className="qsuccess surf-evergreen">
          <div className="container qsuccess__inner">
            <span className="qsuccess__mark" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="m4 12.5 5.5 5.5L20 7" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h1 className="qsuccess__title">Your email app should have opened.</h1>
            <p className="qsuccess__body">
              Your request has been prepared as an email — you will need to press send in
              your mail app to deliver it. If nothing opened, you can reach us directly:
            </p>
            <div className="qsuccess__contacts">
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <a href="tel:+14036070581">{CONTACT_PHONE}</a>
            </div>
            <Link to="/" className="btn btn-ghost qsuccess__home">Back to Home</Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="quote-page">

      <section className="page-hero surf-evergreen">
        <div className="container">
          <div className="qhero">
            <span className="eyebrow page-hero__eyebrow">Get a Quote</span>
            <span className="rule" />
            <h1 className="page-hero__title">Tell us about <em>your home.</em></h1>
            <p className="page-hero__sub">
              Five short steps. No pricing is calculated here — we review your details and
              come back to confirm scope and cost.
            </p>
          </div>
        </div>
      </section>

      <section className="qform surf-ivory sec-lg">
        <div className="container container--narrow">
          <ScrollReveal>
            {/* Progress */}
            <nav className="qprog" aria-label="Form progress">
              {stepNames.map((label, i) => {
                const n = (i + 1) as Step
                const state = n < step ? 'done' : n === step ? 'now' : 'todo'
                return (
                  <button
                    key={label}
                    type="button"
                    className={`qprog__item qprog__item--${state}`}
                    onClick={() => n < step && setStep(n)}
                    disabled={n > step}
                    aria-current={n === step ? 'step' : undefined}
                  >
                    <span className="qprog__bar" />
                    <span className="qprog__label">{label}</span>
                  </button>
                )
              })}
            </nav>

            <form
              className="qcard"
              noValidate
              onSubmit={e => {
                e.preventDefault()
                if (step === 5) submit()
                else next()
              }}
            >
              <p className="qcard__count">Step {step} of 5</p>

              {/* Honeypot */}
              <input
                type="text" tabIndex={-1} autoComplete="off" className="qhp"
                aria-hidden="true" value={form.honeypot}
                onChange={e => set('honeypot', e.target.value)}
              />

              {step === 1 && (
                <fieldset className="qstep">
                  <legend className="qstep__q">Which service are you interested in?</legend>
                  <div className="qchoices">
                    {['House Cleaning', 'Apartment Cleaning', 'Recurring Cleaning', 'Not sure yet'].map(s => (
                      <button
                        key={s} type="button"
                        className={`qchoice${form.service === s ? ' qchoice--on' : ''}`}
                        onClick={() => set('service', s)}
                      >{s}</button>
                    ))}
                  </div>
                  {errors.service && <p className="qerr">{errors.service}</p>}
                </fieldset>
              )}

              {step === 2 && (
                <fieldset className="qstep">
                  <legend className="qstep__q">Tell us about the space.</legend>

                  <label className="qlabel">Home type</label>
                  <div className="qchoices">
                    {['House', 'Apartment', 'Condo'].map(t => (
                      <button key={t} type="button"
                        className={`qchoice${form.homeType === t ? ' qchoice--on' : ''}`}
                        onClick={() => set('homeType', t)}
                      >{t}</button>
                    ))}
                  </div>
                  {errors.homeType && <p className="qerr">{errors.homeType}</p>}

                  <label className="qlabel">Bedrooms</label>
                  <div className="qchoices">
                    {['1', '2', '3', '4', '5+'].map(n => (
                      <button key={n} type="button"
                        className={`qchoice qchoice--sm${form.bedrooms === n ? ' qchoice--on' : ''}`}
                        onClick={() => set('bedrooms', n)}
                      >{n}</button>
                    ))}
                  </div>
                  {errors.bedrooms && <p className="qerr">{errors.bedrooms}</p>}

                  <label className="qlabel">Bathrooms <span className="qopt">(optional)</span></label>
                  <div className="qchoices">
                    {['1', '2', '3', '4+'].map(n => (
                      <button key={n} type="button"
                        className={`qchoice qchoice--sm${form.bathrooms === n ? ' qchoice--on' : ''}`}
                        onClick={() => set('bathrooms', n)}
                      >{n}</button>
                    ))}
                  </div>
                </fieldset>
              )}

              {step === 3 && (
                <fieldset className="qstep">
                  <legend className="qstep__q">How often would you like us?</legend>
                  <div className="qchoices">
                    {['One-time clean', 'Weekly', 'Bi-weekly', 'Monthly', 'Still deciding'].map(f => (
                      <button key={f} type="button"
                        className={`qchoice${form.frequency === f ? ' qchoice--on' : ''}`}
                        onClick={() => set('frequency', f)}
                      >{f}</button>
                    ))}
                  </div>
                  {errors.frequency && <p className="qerr">{errors.frequency}</p>}
                </fieldset>
              )}

              {step === 4 && (
                <fieldset className="qstep">
                  <legend className="qstep__q">Location and timing.</legend>

                  <label className="qlabel" htmlFor="q-area">Area or postal code</label>
                  <input id="q-area" type="text" className="qinput" placeholder="e.g. Beltline, or T2P"
                    value={form.area} onChange={e => set('area', e.target.value)} />
                  {errors.area && <p className="qerr">{errors.area}</p>}

                  <label className="qlabel" htmlFor="q-date">Preferred date <span className="qopt">(optional)</span></label>
                  <input id="q-date" type="date" className="qinput"
                    value={form.preferredDate} onChange={e => set('preferredDate', e.target.value)} />

                  <label className="qlabel" htmlFor="q-notes">Anything else we should know? <span className="qopt">(optional)</span></label>
                  <textarea id="q-notes" className="qinput qtextarea" rows={4}
                    placeholder="Pets, access arrangements, areas to prioritise, product sensitivities…"
                    value={form.notes} onChange={e => set('notes', e.target.value)} />
                </fieldset>
              )}

              {step === 5 && (
                <fieldset className="qstep">
                  <legend className="qstep__q">How can we reach you?</legend>

                  <label className="qlabel" htmlFor="q-name">Name</label>
                  <input id="q-name" type="text" className="qinput" autoComplete="name"
                    value={form.name} onChange={e => set('name', e.target.value)} />
                  {errors.name && <p className="qerr">{errors.name}</p>}

                  <label className="qlabel" htmlFor="q-email">Email</label>
                  <input id="q-email" type="email" className="qinput" autoComplete="email"
                    value={form.email} onChange={e => set('email', e.target.value)} />
                  {errors.email && <p className="qerr">{errors.email}</p>}

                  <label className="qlabel" htmlFor="q-phone">Phone <span className="qopt">(optional)</span></label>
                  <input id="q-phone" type="tel" className="qinput" autoComplete="tel"
                    value={form.phone} onChange={e => set('phone', e.target.value)} />

                  <label className="qlabel">Preferred contact method</label>
                  <div className="qchoices">
                    {['email', 'phone'].map(p => (
                      <button key={p} type="button"
                        className={`qchoice qchoice--sm${form.contactPref === p ? ' qchoice--on' : ''}`}
                        onClick={() => set('contactPref', p)}
                      >{p === 'email' ? 'Email' : 'Phone'}</button>
                    ))}
                  </div>

                  <label className="qconsent">
                    <input type="checkbox" checked={form.consent}
                      onChange={e => set('consent', e.target.checked)} />
                    <span>
                      I'm happy for Leads Cleaning to contact me about this enquiry.
                      Your details are used only to respond to this request.
                    </span>
                  </label>
                  {errors.consent && <p className="qerr">{errors.consent}</p>}

                  <p className="qnote">
                    Sending opens your own email app with these details filled in — you
                    press send. Nothing is transmitted from this page.
                  </p>
                </fieldset>
              )}

              <div className="qactions">
                {step > 1 && (
                  <button type="button" className="btn btn-ghost-dark" onClick={prev}>Back</button>
                )}
                <button type="submit" className="btn btn-primary qactions__next">
                  {step === 5 ? 'Send My Request' : 'Continue'}
                </button>
              </div>
            </form>

            <aside className="qaside">
              <p>Prefer to talk it through?</p>
              <a href="tel:+14036070581" className="qaside__phone">{CONTACT_PHONE}</a>
            </aside>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
