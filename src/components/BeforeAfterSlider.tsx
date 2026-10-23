import { useRef, useState, useCallback, type KeyboardEvent, type PointerEvent } from 'react'
import './BeforeAfterSlider.css'

interface Props {
  before: string
  after: string
  beforeAlt: string
  afterAlt: string
  label: string
  /** Render for placement on a dark surface */
  onDark?: boolean
  /** Hide the built-in disclosure when the parent already shows one */
  hideDisclosure?: boolean
}

export default function BeforeAfterSlider({
  before, after, beforeAlt, afterAlt, label, onDark = false, hideDisclosure = false,
}: Props) {
  const [position, setPosition] = useState(50)
  const trackRef = useRef<HTMLDivElement>(null)

  const updateFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }, [])

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    updateFromClientX(e.clientX)
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) updateFromClientX(e.clientX)
  }

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  const onKey = (e: KeyboardEvent) => {
    const nudge = e.shiftKey ? 10 : 3
    if (e.key === 'ArrowLeft') { e.preventDefault(); setPosition(p => Math.max(0, p - nudge)) }
    if (e.key === 'ArrowRight') { e.preventDefault(); setPosition(p => Math.min(100, p + nudge)) }
    if (e.key === 'Home') { e.preventDefault(); setPosition(0) }
    if (e.key === 'End') { e.preventDefault(); setPosition(100) }
  }

  return (
    <figure className={`baf${onDark ? ' baf--dark' : ''}`}>
      <div
        className="baf__track"
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <img src={after} alt={afterAlt} className="baf__img" draggable={false} />

        <div className="baf__before" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <img src={before} alt={beforeAlt} className="baf__img" draggable={false} />
        </div>

        <span className="baf__tag baf__tag--before" aria-hidden="true">Before</span>
        <span className="baf__tag baf__tag--after" aria-hidden="true">After</span>

        <div className="baf__handle" style={{ left: `${position}%` }}>
          <span className="baf__line" aria-hidden="true" />
          <span
            className="baf__knob"
            role="slider"
            aria-label={label}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position)}
            aria-valuetext={`${Math.round(position)}% before, ${100 - Math.round(position)}% after`}
            tabIndex={0}
            onKeyDown={onKey}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M7.5 4.5 3 10l4.5 5.5M12.5 4.5 17 10l-4.5 5.5"
                stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>

      {!hideDisclosure && (
        <figcaption className="baf__disclosure disclosure">
          Illustrative concept images, not customer projects.
        </figcaption>
      )}
    </figure>
  )
}
