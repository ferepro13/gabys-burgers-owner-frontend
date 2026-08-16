import { useState } from 'react'
import ProductoList from '../components/productos/ProductoList'
import ProductoForm from '../components/productos/ProductoForm'

export default function Productos() {
  const [createOpen, setCreateOpen] = useState(false)
  return <section>
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gold">Catálogo</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">Productos</h1>
        <p className="mt-2 text-sm text-cream/50">Administra precios, stock, disponibilidad e imágenes.</p>
      </div>
      <button onClick={() => setCreateOpen(true)} className="rounded-xl bg-gold px-4 py-3 text-sm font-medium text-ink">+ Nuevo producto</button>
    </div>
    <div className="mt-7"><ProductoList /></div>
    {createOpen ? <ProductoForm onClose={() => setCreateOpen(false)} /> : null}  
  </section>
}
