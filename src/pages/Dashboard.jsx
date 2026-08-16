import { Link } from 'react-router-dom'
import useGetProductos from '../hooks/useGetProductos'
import useGetExtras from '../hooks/useGetExtras'
import useGetPedidos from '../hooks/useGetPedidos'
import LoadingState from '../components/ui/LoadingState'

export default function Dashboard() {
  const products = useGetProductos()
  const extras = useGetExtras()
  const pedidos = useGetPedidos()

  const loading = products.isLoading || extras.isLoading || pedidos.isLoading
  if (loading) return <LoadingState label="Preparando el resumen..." />

  const productData = products.data || []
  const extraData = extras.data || []
  const pedidoData = pedidos.data || []
  const pending = pedidoData.filter(p => p.orderState === 'pendiente').length
  const availableProducts = productData.filter(p => Number(p.stock) > 0).length
  const availableExtras = extraData.filter(e => e.isAvailable).length

  const stats = [['Productos', productData.length, `${availableProducts} disponibles`, '/productos'], ['Extras', extraData.length, `${availableExtras} disponibles`, '/extras'], ['Pedidos', pedidoData.length, `${pending} pendientes`, '/pedidos']]

  return <section>
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gold">Resumen</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">Panel de control</h1>
        <p className="mt-2 text-sm text-cream/50">Una vista rápida del estado de tu operación.</p>
      </div>
      <Link to="/pedidos" className="rounded-xl bg-gold px-4 py-3 text-center text-sm font-medium text-ink">Ver pedidos</Link>
    </div>
    
    <div className="mt-8 grid gap-4 md:grid-cols-3">
      {stats.map(([label,value,detail,to]) => 
        <Link key={label} to={to} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-gold/30">
        <p className="text-sm text-cream/50">{label}</p>
        <p className="mt-2 font-display text-3xl text-cream">{value}</p>
        <p className="mt-2 text-xs text-gold">{detail}</p></Link>)}
    </div>
    
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/2.5 p-5">
      <h2 className="font-display text-xl">Acciones rápidas</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Link to="/productos" className="rounded-xl border border-white/10 px-4 py-3 text-sm text-cream/70 hover:border-gold/30 hover:text-gold">Gestionar productos</Link>
        <Link to="/extras" className="rounded-xl border border-white/10 px-4 py-3 text-sm text-cream/70 hover:border-gold/30 hover:text-gold">Gestionar extras</Link>
        <Link to="/pedidos" className="rounded-xl border border-white/10 px-4 py-3 text-sm text-cream/70 hover:border-gold/30 hover:text-gold">Revisar pedidos</Link>
      </div>
    </div>
  </section>
}
