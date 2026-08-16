import { motion } from 'framer-motion'

/**
 * Soft floating card shell — gold border on dark surface.
 */
export function FloatingCard({ children, className = '', float = true }) {
  return (
    <motion.div
      className={`rounded-2xl border border-gold/25 bg-ink-elevated/90 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)] backdrop-blur-sm ${className}`}
      animate={
        float
          ? {
              y: [0, -8, 0],
            }
          : undefined
      }
      transition={
        float
          ? {
              duration: 5.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  )
}
