import { motion } from 'framer-motion'

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:pointer-events-none disabled:opacity-50'

const variants = {
  primary:
    'bg-gold text-ink hover:bg-gold-light shadow-[0_10px_30px_-12px_rgba(201,162,39,0.65)]',
  secondary:
    'border border-gold/50 bg-transparent text-cream hover:border-gold hover:bg-gold/10',
  ghost: 'text-cream/90 hover:text-gold',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm sm:text-base',
  lg: 'px-8 py-3.5 text-base sm:text-lg',
}

export function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  href,
  disabled,
  type = 'button',
  ...props
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (href && !disabled) {
    return (
      <motion.a
        href={href}
        aria-disabled={disabled}
        className={classes}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      disabled = {disabled}
      aria-disabled = {disabled}
      className={classes}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
