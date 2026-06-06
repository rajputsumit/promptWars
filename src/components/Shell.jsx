export function Logo({ size = 'h-9 w-9' }) {
  return (
    <div className={`${size} rounded-lg bg-primary flex items-center justify-center text-on-primary`}>
      <Icon name="eco" fill={1} />
    </div>
  )
}

// Material Symbols render their ligature text ("arrow_forward"), which screen
// readers would otherwise read aloud. Icons are decorative by default
// (aria-hidden). Pass `label` to expose an accessible name instead.
export function Icon({ name, className = '', fill = 0, style = {}, label }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ fontVariationSettings: `'FILL' ${fill}`, ...style }}
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      {name}
    </span>
  )
}

export function Header({ step }) {
  return (
    <header className="w-full sticky top-0 z-50 bg-surface/95 backdrop-blur border-b border-surface-variant">
      <div className="max-w-[1100px] mx-auto px-container-margin h-16 flex items-center justify-between">
        <div className="flex items-center gap-md">
          <Logo />
          <span className="text-display-lg-mobile font-bold text-primary tracking-tight">Culina</span>
        </div>
        {step && (
          <span className="font-label-md text-label-md text-on-surface-variant uppercase">{step}</span>
        )}
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="w-full py-lg mt-xxl bg-surface-container-lowest border-t border-surface-variant">
      <div className="max-w-[1100px] mx-auto px-container-margin flex flex-col sm:flex-row justify-between items-center gap-sm">
        <span className="text-title-lg font-bold text-on-surface">Culina</span>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Balanced Indian meals, planned to your body &amp; budget.
        </p>
      </div>
    </footer>
  )
}
