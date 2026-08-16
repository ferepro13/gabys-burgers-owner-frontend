import { motion } from 'framer-motion'

const money = value => new Intl.NumberFormat(import.meta.env.VITE_LOCALE || 'es-US', { style: 'currency', currency: import.meta.env.VITE_CURRENCY || 'USD' }).format(Number(value || 0))

export default function ProductoCard({ producto, onEdit, onDelete, deleting = false }) {
  const available = Number(producto.stock) > 0

  return (
    <motion.article layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
      <div className="aspect-video bg-black/20">
        {producto.imageUrl ? <img src={producto.imageUrl} alt={producto.name} className="h-full w-full object-cover" loading="lazy" /> : <div className="flex h-full items-center justify-center text-sm text-cream/30">Sin imagen</div>}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-display text-lg text-cream">{producto.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-cream/50">{producto.description || 'Sin descripción'}</p>
          </div>
          <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs ${available ? 'bg-emerald-400/10 text-emerald-300' : 'bg-red-400/10 text-red-300'}`}>{available ? 'Disponible' : 'Agotado'}</span>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-gold">{money(producto.price)}</span>
          <span className="text-cream/45">Stock: {producto.stock}</span>
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={() => onEdit(producto)} className="flex-1 rounded-lg border border-white/10 px-3 py-2 text-sm text-cream/75 hover:border-gold/40 hover:text-gold">Editar</button>
          <button disabled={deleting} onClick={() => onDelete(producto)} className="rounded-lg border border-red-400/20 px-3 py-2 text-sm text-red-300 hover:bg-red-400/10 disabled:opacity-50">{deleting ? '...' : 'Eliminar'}</button>
        </div>
      </div>
    </motion.article>
  )
}
