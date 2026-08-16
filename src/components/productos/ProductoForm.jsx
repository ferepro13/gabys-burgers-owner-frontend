import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import useCreateProducto from '../../hooks/useCreateProducto'
import useUpdateProducto from '../../hooks/useUpdateProducto'

export default function ProductoForm({ initialData = null, onClose, onSaved }) {
  const createMutation = useCreateProducto()
  const updateMutation = useUpdateProducto()
  const mutation = initialData ? updateMutation : createMutation
  const fileRef = useRef(null)
  const [preview, setPreview] = useState(initialData?.imageUrl || '')
  const [fileImage, setFileImage] = useState()
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      price: initialData?.price ?? '',
      stock: initialData?.stock ?? '',
    },
  })

  useEffect(() => () => preview?.startsWith('blob:') && URL.revokeObjectURL(preview), [preview])

  const onFileChange = event => {
    const file = event.target.files?.[0]
    if (!file) return
    if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview)
    setPreview(URL.createObjectURL(file))
    setFileImage(file)
  }

  const onSubmit = async values => {
    setServerError('')
    const formData = new FormData()
    formData.append('name', values.name.trim())
    formData.append('description', values.description?.trim() || '')
    formData.append('price', values.price)
    formData.append('stock', values.stock)
    //const file = fileRef.current?.files?.[0]
    //if (file) formData.append('image', file)
    if (fileImage) formData.append("image", fileImage)

    try {
      if (initialData) await updateMutation.mutateAsync({ uuid: initialData.uuid, formData })
      else await createMutation.mutateAsync(formData)
      reset()
      onSaved?.()
      onClose?.()
    } catch (error) {
      setServerError(error?.data?.error || error?.message || 'No se pudo guardar el producto')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-white/10 bg-[#151515] p-5 sm:rounded-3xl sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div><p className="text-xs uppercase tracking-[0.18em] text-gold">Productos</p><h2 className="mt-1 font-display text-2xl">{initialData ? 'Editar producto' : 'Nuevo producto'}</h2></div>
          <button onClick={onClose} className="text-xl text-cream/40 hover:text-cream">×</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <label className="block"><span className="mb-2 block text-sm text-cream/70">Nombre</span><input className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-gold/50" {...register('name', { required: 'El nombre es obligatorio' })} />{errors.name && <small className="text-red-300">{errors.name.message}</small>}</label>
          <label className="block"><span className="mb-2 block text-sm text-cream/70">Descripción</span><textarea rows={3} className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-gold/50" {...register('description')} /></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm text-cream/70">Precio</span>
              <input type="number" min="0" step="0.01" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-gold/50" {...register('price', { required: 'El precio es obligatorio', min: { value: 0, message: 'Debe ser positivo' } })} />{errors.price && <small className="text-red-300">{errors.price.message}</small>}</label>
            <label className="block"><span className="mb-2 block text-sm text-cream/70">Stock</span><input type="number" min="0" step="1" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-gold/50" {...register('stock', { required: 'El stock es obligatorio', min: { value: 0, message: 'No puede ser negativo' } })} />{errors.stock && <small className="text-red-300">{errors.stock.message}</small>}</label>
          </div>
          
          <label className="block">
            <span className="mb-2 block text-sm text-cream/70">Imagen {initialData ? '(opcional)' : ''}</span>
            <input ref={fileRef} type="file" accept="image/*" onChange={onFileChange} className="block w-full rounded-xl border border-dashed border-white/10 bg-black/10 p-3 text-sm text-cream/60 file:mr-4 file:rounded-lg file:border-0 file:bg-gold/10 file:px-3 file:py-2 file:text-gold" />
          </label>
          
          
          {preview ? <div className="overflow-hidden rounded-xl border border-white/10"><img src={preview} alt="Vista previa" className="max-h-64 w-full object-cover" /></div> : null}
          {serverError ? <div className="rounded-xl bg-red-400/10 px-4 py-3 text-sm text-red-200">{serverError}</div> : null}
          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end"><button type="button" onClick={onClose} className="rounded-xl border border-white/10 px-5 py-3 text-sm text-cream/70">Cancelar</button><button disabled={mutation.isPending} className="rounded-xl bg-gold px-5 py-3 text-sm font-medium text-ink disabled:opacity-50">{mutation.isPending ? 'Guardando…' : initialData ? 'Guardar cambios' : 'Crear producto'}</button></div>
        </form>
      </motion.div>
    </div>
  )
}
