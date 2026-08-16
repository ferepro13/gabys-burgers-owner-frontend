import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

/**
 * Fade-up entrance on scroll into view.
 */
export function FadeUp({
  children,
  className = '',
  delay = 0,
  as = 'div',
  once = true,
}) {
  const Component = motion[as] ?? motion.div

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Component>
  )
}
