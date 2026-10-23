interface Props {
  /** Base filename in /assets/photos, without extension */
  name: string
  alt: string
  /** Extra classes applied to the wrapping figure (aspect-ratio, hover behaviour) */
  className?: string
  /** Skip lazy-loading for above-the-fold imagery */
  eager?: boolean
  /** object-position, for art-directing the crop */
  position?: string
}

export default function Photo({ name, alt, className = '', eager = false, position }: Props) {
  return (
    <div className={`ph ${className}`}>
      <picture>
        <source srcSet={`./assets/photos/${name}.webp`} type="image/webp" />
        <img
          src={`./assets/photos/${name}.jpg`}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding={eager ? 'sync' : 'async'}
          style={position ? { objectPosition: position } : undefined}
        />
      </picture>
    </div>
  )
}
