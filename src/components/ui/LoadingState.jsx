import { motion } from 'framer-motion'

export default function LoadingState({ label = 'Cargando...' }) {
  return (
    <div className="flex min-h-55 flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/3 p-8 text-center">
      <motion.div
        className="h-9 w-9 rounded-full border-2 border-white/15 border-t-gold"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
      />
      <p className="text-sm text-cream/60">{label}</p>
    </div>
  )
}
