import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function DashboardLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-ink text-cream">
      <div className="flex min-h-screen">
        <Navbar open={menuOpen} onClose={() => setMenuOpen(false)} />
        {menuOpen ? <button className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú" /> : null}

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex h-16 items-center border-b border-white/10 bg-ink/90 px-4 backdrop-blur sm:px-6 lg:hidden">
            <button onClick={() => setMenuOpen(true)} className="rounded-xl border border-white/10 px-3 py-2 text-sm text-cream/75">Menú</button>
            <p className="ml-4 font-display text-lg">Owner panel</p>
          </header>
          <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
