import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const links = [
  ['/dashboard', 'Inicio'],
  ['/productos', 'Productos'],
  ['/extras', 'Extras'],
  ['/pedidos', 'Pedidos'],
  ['/metricas', 'Métricas'],
]

export default function Navbar({ open = false, onClose }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <aside className={`${open ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/10 bg-ink p-5 transition-transform duration-300 lg:static lg:translate-x-0`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-lg text-cream">Gaby's Burger</p>
          <p className="text-xs uppercase tracking-[0.18em] text-gold">Owner panel</p>
        </div>
        <button onClick={onClose} className="rounded-lg px-2 py-1 text-cream/50 hover:bg-white/5 lg:hidden" aria-label="Cerrar menú">×</button>
      </div>

      <nav className="mt-8 space-y-1">
        {links.map(([to, label]) => (
          <NavLink key={to} to={to} onClick={onClose} className={({ isActive }) => `block rounded-xl px-4 py-3 text-sm transition ${isActive ? 'bg-gold/10 text-gold' : 'text-cream/60 hover:bg-white/5 hover:text-cream'}`}>
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-white/10 pt-5">
        <p className="truncate text-sm text-cream">{user?.username || 'Propietario'}</p>
        <button onClick={handleLogout} className="mt-3 text-sm text-cream/45 hover:text-red-300">Cerrar sesión</button>
      </div>
    </aside>
  )
}
