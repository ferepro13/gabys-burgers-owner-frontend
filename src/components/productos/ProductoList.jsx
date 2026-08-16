import { useState } from 'react'
import useGetProductos from '../../hooks/useGetProductos'
import useDeleteProducto from '../../hooks/useDeleteProducto'
import ProductoCard from './ProductoCard'
import LoadingState from '../ui/LoadingState'
import EmptyState from '../ui/EmptyState'
import ProductoForm from './ProductoForm'

export default function ProductoList() {
  const { data, isLoading, isError, refetch, isFetching } = useGetProductos()
  const deleteMutation = useDeleteProducto()
  const [editing, setEditing] = useState(null)

  const handleDelete = async producto => {
    if (!window.confirm(`¿Eliminar "${producto.name}"?`)) return
    await deleteMutation.mutateAsync(producto.uuid)
  }

  if (isLoading) return <LoadingState label="Cargando productos..." />
  if (isError) return (
    <EmptyState title="No pudimos cargar los productos" description="Revisa la conexión e inténtalo de nuevo." 
    action={<button onClick={refetch} className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-ink">Reintentar</button>} />
  )
  if (!data?.length) return (// agregar al empty state una propiedad action q lleve a la creacion de productos
    <EmptyState title="Todavía no hay productos" description="Crea el primer producto para comenzar a administrar tu menú." />
  )
  return (
    <div className="relative">
      {isFetching ? <span className="absolute -top-8 right-0 text-xs text-cream/40">Actualizando…</span> : null}
      
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data.map(producto => <ProductoCard key={producto.uuid} producto={producto} onEdit={setEditing} onDelete={handleDelete} deleting={deleteMutation.isPending} />)}
      </div>

      {editing ? <ProductoForm initialData={editing} onClose={() => setEditing(null)} /> : null}
    </div>

    
  )
  /* // render this one if ordered by categories
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data.map(category => (
          <div>
            <h2>{category[0].category}</h2>
            {category.map(producto => <ProductoCard key={producto.uuid} producto={producto} onEdit={setEditing} onDelete={handleDelete} deleting={deleteMutation.isPending} />)}
          </div>
        )
        ) }
      </div>
  */
}
