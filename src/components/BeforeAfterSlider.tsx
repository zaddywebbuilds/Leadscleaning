import { useRef, useState, useCallback, type KeyboardEvent } from 'react'
import './BeforeAfterSlider.css'

interface Props {
  before: string
  after: string
  beforeAlt: string
  afterAlt: string
  label: string
}

export default function BeforeAfterSlider({ before, after, beforeAlt, afterAlt, label }: Props) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
    setPosition(pct)
  }, [])

  const onMouseDown = () => {
    dragging.current = true
    const onMove = (e: MouseEvent) => { if (dragging.current) updatePosition(e.clientX) }
    const onUp = () => { dragging.current = false; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const onTouchStart = () => {
    const onMove = (e: TouchEvent) => updatePosition(e.touches[0].clientX)
    const onEnd = () => { window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onEnd) }
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onEnd)
  }

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPosition(p => Math.max(0, p - 2))
    if (e.key === 'ArrowRight') setPosition(p => Math.min(100, p + 2))
  }

  return (
    <div className="baf" aria-label={label}>
      <div
        className="baf__track"
        ref={containerRef}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        <img src={after} alt={afterAlt} className="baf__img baf__img--after" />
        <div className="baf__before-wrap" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <img src={before} alt={beforeAlt} className="baf__img" />
        </div>
        <div
          className="baf__handle"
          style={{ left: `${position}%` }}
          role="slider"
          aria-label="Slide to compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          tabIndex={0}
          onKeyDown={onKey}
        >
          <div className="baf__line" />
          <div className="baf__knob">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M7 4l-4 6 4 6M13 4l4 6-4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <span className="baf__label baf__label--before">Before</span>
        <span className="baf__label baf__label--after">After</span>
      </div>
      <p className="baf__disclosure">
        Illustrative concept images — not an actual client project.
      </p>
    </div>
  )
}
