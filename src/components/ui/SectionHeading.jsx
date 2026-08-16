export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
  id,
}) {
  const alignment =
    align === 'left' ? 'text-left items-start' : 'text-center items-center'

  return (
    <header className={`flex flex-col gap-3 ${alignment} ${className}`}>
      {eyebrow ? (
        <p className="font-display text-sm tracking-[0.22em] text-gold uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="font-display text-3xl leading-tight text-cream sm:text-4xl md:text-5xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-cream/70 sm:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  )
}
