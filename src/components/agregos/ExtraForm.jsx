import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import useCreateExtra from '../../hooks/useCreateExtra'
import useUpdateExtra from '../../hooks/useUpdateExtra'
import { useState } from 'react'

export default function ExtraForm({ initialData = null, onClose }) {
  const createMutation = useCreateExtra()
  const updateMutation = useUpdateExtra()
  const mutation = initialData ? updateMutation : createMutation
  const [serverError, setServerError] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: initialData?.name || '',
      price: initialData?.price ?? '',
      isAvailable: initialData?.isAvailable ?? true,
    },
  })

  const onSubmit = async values => {
    setServerError('')
    const payload = { name: values.name.trim(), price: Number(values.price), isAvailable: Boolean(values.isAvailable) }
    try {
      if (initialData) await updateMutation.mutateAsync({ uuid: initialData.uuid, data: payload })
      else await createMutation.mutateAsync(payload)
      onClose?.()
    } catch (error) {
      setServerError(error?.data?.error || error?.message || 'No se pudo guardar el extra')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6">
      <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg rounded-t-3xl border border-white/10 bg-[#151515] p-6 sm:rounded-3xl">
        <div className="flex justify-between"><div><p className="text-xs uppercase tracking-[0.18em] text-gold">Extras</p><h2 className="mt-1 font-display text-2xl">{initialData ? 'Editar extra' : 'Nuevo extra'}</h2></div><button onClick={onClose} className="text-xl text-cream/40">×</button></div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <label className="block"><span className="mb-2 block text-sm text-cream/70">Nombre</span><input className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-gold/50" {...register('name', { required: 'El nombre es obligatorio' })} />{errors.name && <small className="text-red-300">{errors.name.message}</small>}</label>
          <label className="block"><span className="mb-2 block text-sm text-cream/70">Precio</span><input type="number" min="0" step="0.01" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-gold/50" {...register('price', { required: 'El precio es obligatorio', min: { value: 0, message: 'No puede ser negativo' } })} />{errors.price && <small className="text-red-300">{errors.price.message}</small>}</label>
          <label className="flex items-center justify-between rounded-xl border border-white/10 p-4"><span><span className="block text-sm text-cream">Disponible</span><span className="text-xs text-cream/45">El cliente podrá seleccionar este extra.</span></span><input type="checkbox" className="h-5 w-5 accent-gold" {...register('isAvailable')} /></label>
          {serverError ? <div className="rounded-xl bg-red-400/10 px-4 py-3 text-sm text-red-200">{serverError}</div> : null}
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><button type="button" onClick={onClose} className="rounded-xl border border-white/10 px-5 py-3 text-sm">Cancelar</button><button disabled={mutation.isPending} className="rounded-xl bg-gold px-5 py-3 text-sm font-medium text-ink">{mutation.isPending ? 'Guardando…' : 'Guardar'}</button></div>
        </form>
      </motion.div>
    </div>
  )
}
