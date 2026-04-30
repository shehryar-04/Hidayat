import logoSrc from '../../assets/LOGO_HIDAYAT.png'

/**
 * Reusable HIDAYAT logo component.
 * @param {object} props
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Size variant
 * @param {boolean} [props.showText=true] - Show "HIDAYAT" text next to logo
 * @param {string} [props.className] - Additional classes
 */
export default function Logo({ size = 'md', showText = true, className = '' }) {
  const sizes = {
    sm: { img: 'h-6 w-6', text: 'text-base' },
    md: { img: 'h-8 w-8', text: 'text-xl sm:text-2xl' },
    lg: { img: 'h-10 w-10', text: 'text-2xl sm:text-3xl' },
  }
  const s = sizes[size] || sizes.md

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <img src={logoSrc} alt="HIDAYAT" className={`${s.img} object-contain`} />
      {showText && (
        <span className={`font-serif font-bold text-primary ${s.text} leading-tight`}>
          HIDAYAT
        </span>
      )}
    </span>
  )
}

/** Just the image, for favicon / tab icon usage */
export { logoSrc }
