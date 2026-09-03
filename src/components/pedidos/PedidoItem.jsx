import {Button} from "../ui/Button"
const money = value => new Intl.NumberFormat(import.meta.env.VITE_LOCALE || 'es-US', { style: 'currency', currency: import.meta.env.VITE_CURRENCY || 'USD' }).format(Number(value || 0))

export default function PedidoItem({ pedido, onDetails= f => f, onMarkDone= f => f, onDelete= f=>f , updating = false, deleting = false }) {
  const parsedOrder = typeof pedido.orderDetails === 'string' ? (() => { try { return JSON.parse(pedido.orderDetails) } catch { return null } })() : pedido.orderDetails
  const items = parsedOrder?.productos || []
  //const items = [...(parsedOrder?.productos || []), ...(parsedOrder?.extras || [])]
  const pending = pedido.orderState === 'pendiente'
  const date = pedido.toDate ? new Date(pedido.toDate) : null

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-medium text-cream">{pedido.clientName || 'Cliente'}</h3>
          <p className="mt-1 text-xs text-cream/45">{date ? date.toLocaleDateString('es-ES') : 'Fecha no disponible'} · {pedido.time || 'Hora no indicada'}</p>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs ${pending ? 'bg-amber-400/10 text-amber-200' : 'bg-emerald-400/10 text-emerald-300'}`}>
        {pending ? 'Pendiente' : 'Hecho'}</span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-cream/45">{items.length} elemento{items.length === 1 ? '' : 's'}</span>
        <span className="font-medium text-gold">{money(pedido.orderTotalCost)}</span>
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={() => onDetails(pedido)} className="flex-1 rounded-lg border border-white/10 px-3 py-2 text-sm text-cream/75 hover:border-gold/40">
        Detalles
        </button>
        {pending ? 
        <button disabled={updating} onClick={() => onMarkDone(pedido)} className="rounded-lg bg-gold px-3 py-2 text-sm font-medium text-ink disabled:opacity-50">
          {updating ? '...' : 'Marcar hecho'}
        </button>
         : null}
        <Button size="sm" variant="secondary" disabled={deleting} onClick={() => onDelete(pedido.uuid)}>
          {deleting ? "deleting..." : "Borrar"}
        </Button>
      </div>
    </article>
  )
}
