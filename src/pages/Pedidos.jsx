import PedidosList from '../components/pedidos/PedidosList'

export default function Pedidos() {
  return <section><div className="flex flex-col gap-2"><p className="text-xs uppercase tracking-[0.2em] text-gold">Operación</p><h1 className="font-display text-3xl sm:text-4xl">Pedidos</h1><p className="text-sm text-cream/50">Revisa los pedidos recientes y marca como hechos los que ya fueron atendidos.</p></div><div className="mt-7"><PedidosList /></div></section>
}
