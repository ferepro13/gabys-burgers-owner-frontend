import { useState } from 'react'
import useGetExtras from '../../hooks/useGetExtras'
import useDeleteExtra from '../../hooks/useDeleteExtra'
import LoadingState from '../ui/LoadingState'
import EmptyState from '../ui/EmptyState'
import ExtraForm from './ExtraForm'

const money = value => 
  new Intl.NumberFormat(import.meta.env.VITE_LOCALE || 'es-US', { style: 'currency', currency: import.meta.env.VITE_CURRENCY || 'USD' }).format(Number(value || 0))

export default function ExtraList() {
  const { data = [], isLoading, isError, refetch, isFetching } = useGetExtras()
  const deleteMutation = useDeleteExtra()
  const [editing, setEditing] = useState(null)

  if (isLoading) return <LoadingState label="Cargando extras..." />
  if (isError) return <EmptyState title="No pudimos cargar los extras" description="Revisa la conexión e inténtalo de nuevo." 
    action={<button onClick={refetch} className="rounded-lg bg-gold px-4 py-2 text-sm text-ink">Reintentar</button>} />
  
  if (!data.length) return <EmptyState title="No hay extras" description="Crea extras como queso, salsa o ingredientes adicionales para que puedan gestionarse desde el panel." />

  const toggleAvailability = extra => {setEditing({ ...extra }); console.log(extra)}

  return (
    <div className="relative">
      {isFetching ? <span className="absolute -top-8 right-0 text-xs text-cream/40">Actualizando…</span> : null}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {data.map(extra => (
          <article key={extra.uuid} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-lg">{extra.name}</h3>
                <p className="mt-1 text-gold">{money(extra.price)}</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs ${extra.isAvailable ? 'bg-emerald-400/10 text-emerald-300' : 'bg-red-400/10 text-red-300'}`}>
              {extra.isAvailable ? 'Disponible' : 'No disponible'}</span>
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={() => toggleAvailability(extra)} className="flex-1 rounded-lg border border-white/10 px-3 py-2 text-sm text-cream/70 hover:border-gold/40 hover:text-gold">Editar</button>
              <button disabled={deleteMutation.isPending} onClick={() => window.confirm(`¿Eliminar "${extra.name}"?`) && deleteMutation.mutateAsync(extra.uuid)} className="rounded-lg border border-red-400/20 px-3 py-2 text-sm text-red-300">Eliminar</button>
            </div>
          </article>
        ))}
      </div>
      {editing ? <ExtraForm initialData={editing} onClose={() => setEditing(null)} /> : null}
    </div>
  )
}
