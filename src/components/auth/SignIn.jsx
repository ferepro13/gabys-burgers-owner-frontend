import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'

export default function SignIn() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [serverError, setServerError] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async ({ username, password }) => {
    setServerError('')
    const result = await login(username.trim(), password)
    if (result.success) navigate('/dashboard', { replace: true })
    else setServerError(result.error || 'No se pudo iniciar sesión')
  }

  return (
    <main className="min-h-screen bg-ink px-5 py-10 text-cream sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full rounded-3xl border border-white/10 bg-white/4 p-6 shadow-2xl sm:p-8"
        >
          <p className="font-display text-xs uppercase tracking-[0.22em] text-gold">Gaby's Burger · Owner</p>
          <h1 className="mt-3 font-display text-3xl">Iniciar sesión</h1>
          <p className="mt-2 text-sm leading-6 text-cream/55">Accede al panel para gestionar productos, extras y pedidos.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm text-cream/75">Usuario</span>
              <input
                autoComplete="username"
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-cream outline-none transition focus:border-gold/60"
                {...register('username', { required: 'El usuario es obligatorio' })}
              />
              {errors.username ? <span className="mt-1 block text-xs text-red-300">{errors.username.message}</span> : null}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-cream/75">Contraseña</span>
              <input
                type="password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-cream outline-none transition focus:border-gold/60"
                {...register('password', { required: 'La contraseña es obligatoria' })}
              />
              {errors.password ? <span className="mt-1 block text-xs text-red-300">{errors.password.message}</span> : null}
            </label>

            {serverError ? 
            <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              {serverError}
            </div> : null}

            <button disabled={isSubmitting} className="w-full rounded-xl bg-gold px-5 py-3 font-medium text-ink transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? 'Ingresando...' : 'Entrar al panel'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-cream/50">
            ¿Aún no tienes usuario? <Link className="text-gold hover:underline" to="/register">Registrarse</Link>
          </p>
        </motion.section>
      </div>
    </main>
  )
}
