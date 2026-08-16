import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'

export default function SignUp() {
  const navigate = useNavigate()
  const { register: registerOwner } = useAuth()
  const [serverError, setServerError] = useState('')
  const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm()
  //const password = watch('password')
  const password = getValues('password')

  const onSubmit = async ({ username, password }) => {
    setServerError('')
    const result = await registerOwner(username.trim(), password)
    if (result.success) navigate('/login', { replace: true })
    else setServerError(result.error || 'No se pudo registrar el usuario')
  }

  return (
    <main className="min-h-screen bg-ink px-5 py-10 text-cream sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
        <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="w-full rounded-3xl border border-white/10 bg-white/4 p-6 sm:p-8">
          <p className="font-display text-xs uppercase tracking-[0.22em] text-gold">Gaby's Burger · Owner</p>
          <h1 className="mt-3 font-display text-3xl">Crear cuenta</h1>
          <p className="mt-2 text-sm leading-6 text-cream/55">Registra el usuario que utilizarás para administrar el negocio.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm text-cream/75">Usuario</span>
              <input className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-cream outline-none focus:border-gold/60" {...register('username', { required: 'El usuario es obligatorio', minLength: { value: 3, message: 'Mínimo 3 caracteres' } })} />
              {errors.username ? <span className="mt-1 block text-xs text-red-300">{errors.username.message}</span> : null}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-cream/75">Contraseña</span>
              <input type="password" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-cream outline-none focus:border-gold/60" {...register('password', { required: 'La contraseña es obligatoria', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })} />
              {errors.password ? <span className="mt-1 block text-xs text-red-300">{errors.password.message}</span> : null}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-cream/75">Confirmar contraseña</span>
              <input type="password" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-cream outline-none focus:border-gold/60" {...register('confirmPassword', { required: 'Confirma la contraseña', validate: value => value === password || 'Las contraseñas no coinciden' })} />
              {errors.confirmPassword ? <span className="mt-1 block text-xs text-red-300">{errors.confirmPassword.message}</span> : null}
            </label>

            {serverError ? <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">{serverError}</div> : null}
            <button disabled={isSubmitting} className="w-full rounded-xl bg-gold px-5 py-3 font-medium text-ink transition hover:bg-gold-light disabled:opacity-60">
              {isSubmitting ? 'Registrando...' : 'Crear cuenta'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-cream/50">¿Ya tienes cuenta? <Link className="text-gold hover:underline" to="/login">Iniciar sesión</Link></p>
        </motion.section>
      </div>
    </main>
  )
}
