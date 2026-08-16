import EmptyState from '../components/ui/EmptyState'

export default function Metrics() {
  return <section>
    <p className="text-xs uppercase tracking-[0.2em] text-gold">Analítica</p>
    <h1 className="mt-2 font-display text-3xl sm:text-4xl">Métricas</h1>
    <p className="mt-2 text-sm text-cream/50">Este módulo queda preparado para conectar el endpoint /metrics.</p>
    <div className="mt-7">
      <EmptyState title="Métricas en preparación" description="Cuando terminemos el flujo principal de productos, extras y pedidos, aquí podemos incorporar ventas, pedidos y productos más vendidos." />
    </div>
  </section>
}
