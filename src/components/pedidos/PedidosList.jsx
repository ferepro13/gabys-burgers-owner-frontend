import { useMemo, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { put } from '../../api/fetchClient'
import useGetPedidos from '../../hooks/useGetPedidos'
import useDeletePedido from '../../hooks/useDeletePedido'
import PedidoItem from './PedidoItem'
import LoadingState from '../ui/LoadingState'
import EmptyState from '../ui/EmptyState'
import useGetExtras from "../../hooks/useGetExtras"

const money = value => new Intl.NumberFormat(import.meta.env.VITE_LOCALE || 'es-US', { style: 'currency', currency: import.meta.env.VITE_CURRENCY || 'USD' }).format(Number(value || 0))


function Details({ pedido, onClose, onMarkDone, updating }) {
  const {data: extrasData} = useGetExtras()

  const parsedOrder = typeof pedido.orderDetails === 'string' ? (() => { try { return JSON.parse(pedido.orderDetails) } catch { return null } })() : pedido.orderDetails
  //const items = [...(parsedOrder?.productos || []), ...(parsedOrder?.extras || [])]
  const items = parsedOrder?.productos || []
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-white/10 bg-[#151515] p-6 sm:rounded-3xl">
        
        <div className="flex justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-gold">Pedido</p>
            <h2 className="mt-1 font-display text-2xl">{pedido.clientName || 'Cliente'}</h2>
          </div>
          <button onClick={onClose} className="text-xl text-cream/40">x</button>
        </div>
        
        <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-xl bg-white/3 p-3">
            <span className="text-cream/40">Teléfono</span>
            <p className="mt-1">{pedido.clientPhone || '—'}</p>
          </div>
          <div className="rounded-xl bg-white/3 p-3">
            <span className="text-cream/40">Dirección</span>
            <p className="mt-1">{pedido.direction || '—'}</p>
          </div>
          <div className="rounded-xl bg-white/3 p-3">
            <span className="text-cream/40">Fecha</span>
            <p className="mt-1">{pedido.toDate ? new Date(pedido.toDate).toLocaleDateString('es-ES') : '—'}</p>
          </div>
          <div className="rounded-xl bg-white/3 p-3">
            <span className="text-cream/40">Hora</span>
            <p className="mt-1">{pedido.time || '—'}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-display text-lg">Contenido</h3>

          <div className="mt-3 space-y-2">
            {items.length ? 
            items.map((item, index) => 
              <div key={item.uuid || index} className="flex items-center justify-between gap-4 rounded-xl border border-white/10 px-4 py-3 text-sm">
                <p>{item.name || item.productName || 'Elemento'} ({money(item?.price)})</p>
                <ul>
                  {item?.extras.length>0 && item.extras.map((e) => {
                    const extra = extrasData ? extrasData.find((extra)=> e.extraId === (extra.uuid || extra.id)) : e
                    return (
                    <span key={extra.uuid}>
                      <span> + {extra?.name || null} </span>
                      <span>({money(extra?.price) || null}) </span>
                    </span>)
                  })}
                </ul>
                <p className="text-xs text-cream/40">Cantidad: {item.quantity ?? item.qty ?? 1}</p>
                <span className="text-cream/60">{item.price != null ? money(Number(item.price)*(item.quantity ?? item.qty ?? 1)) : ''}</span>
              </div>
              ) : 
            <p className="text-sm text-cream/45">No se pudo interpretar el detalle del pedido.</p>}
          </div>

        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-cream/50">Total</span>
          <strong className="text-xl text-gold">{money(pedido.orderTotalCost)}</strong>
        </div>

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">

          <button onClick={onClose} className="rounded-xl border border-white/10 px-5 py-3 text-sm">Cerrar</button>

          {pedido.orderState === 'pendiente' ? 
          <button disabled={updating} onClick={() => onMarkDone(pedido)} className="rounded-xl bg-gold px-5 py-3 text-sm font-medium text-ink">
            {updating ? 'Actualizando…' : 'Marcar como hecho'}
          </button> : null
          }

        </div>
      </div>
    </div>
  )
}

export default function PedidosList() {
  const { data = [], isLoading, isError, refetch, isFetching } = useGetPedidos()
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('todos')
  const queryClient = useQueryClient()
  
  const deleteMutation = useDeletePedido()

  const stateMutation = useMutation({
    mutationFn: ({ uuid }) => put(`/pedidos/${uuid}/state`, { orderState: 'hecho' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pedidos'] }),
  })

  const filtered = useMemo(() => filter === 'todos' ? data : data.filter(p => p.orderState === filter), [data, filter])

  const markDone = async pedido => {
    try { await stateMutation.mutateAsync({ uuid: pedido.uuid }); setSelected(null) } catch (error) { window.alert(error?.data?.error || 'No se pudo actualizar el pedido') }
  }

  const handleDelete = async uuid => {
    if (!window.confirm(`¿Eliminar pedido?`)) return
    await deleteMutation.mutateAsync(uuid)
  }

  if (isLoading) return <LoadingState label="Cargando pedidos..." />
  if (isError) return <EmptyState title="No pudimos cargar los pedidos" description="Revisa la conexión e inténtalo de nuevo." 
    action={<button onClick={refetch} className="rounded-lg bg-gold px-4 py-2 text-sm text-ink">Reintentar</button>} />
  
  if (!data.length) return <EmptyState title="No hay pedidos todavía" description="Los pedidos realizados desde la tienda aparecerán aquí." />

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex rounded-xl border border-white/10 bg-white/2 p-1">
          {[['todos','Todos'],['pendiente','Pendientes'],['hecho','Hechos']].map(([value,label]) => 
            <button key={value} onClick={() => setFilter(value)} className={`rounded-lg px-3 py-2 text-xs ${filter === value ? 'bg-gold text-ink' : 'text-cream/55'}`}>{label}</button>)}
        </div>
        {isFetching ? <span className="text-xs text-cream/40">Actualizando…</span> : null}
      </div>

      {!filtered.length ? 
        <EmptyState title="No hay pedidos con este filtro" description="Prueba con otro estado." /> : 
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map(pedido => <PedidoItem key={pedido.uuid} pedido={pedido} onDetails={setSelected} onMarkDone={markDone} updating={stateMutation.isPending} onDelete={handleDelete} deleting={deleteMutation.isPending}/>)}
        </div>}

      {selected ? <Details pedido={selected} onClose={() => setSelected(null)} onMarkDone={markDone} updating={stateMutation.isPending} /> : null}
    </div>
  )
}
