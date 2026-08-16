import { useState } from 'react'
import ExtraList from '../components/agregos/ExtraList'
import ExtraForm from '../components/agregos/ExtraForm'

export default function Extras() {
  const [createOpen, setCreateOpen] = useState(false)
  return <section><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs uppercase tracking-[0.2em] text-gold">Complementos</p><h1 className="mt-2 font-display text-3xl sm:text-4xl">Extras</h1><p className="mt-2 text-sm text-cream/50">Gestiona los complementos y decide si están disponibles para los clientes.</p></div><button onClick={() => setCreateOpen(true)} className="rounded-xl bg-gold px-4 py-3 text-sm font-medium text-ink">+ Nuevo extra</button></div><div className="mt-7"><ExtraList /></div>{createOpen ? <ExtraForm onClose={() => setCreateOpen(false)} /> : null}</section>
}
