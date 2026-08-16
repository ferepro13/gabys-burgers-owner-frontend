import { motion } from 'framer-motion'

export default function EmptyState({
  title = 'No hay datos todavía',
  description = 'Cuando existan registros, aparecerán aquí.',
  action = null,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-55 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/2 p-8 text-center"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-lg text-gold">
        —
      </div>
      <h3 className="font-display text-xl text-cream">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-cream/55">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </motion.div>
  )
}
