import { put } from "../api/fetchClient";
import {useMutation, useQueryClient} from "@tanstack/react-query"

const updateProducto = async ({ uuid, formData }) => {
  // formData es un objeto FormData
  const data = await put(`/productos/${uuid}`, formData);
  return data;
};

const useUpdateProducto = () => {
    const queryClient = useQueryClient()

    const updateProductoMutation = useMutation({
        mutationFn:updateProducto,
        mutationKey: ["producto-update"],
        /*
        onMutate: async (formData, uuid) => {
            await queryClient.cancelQueries([{queryKey: ["productos"]}]);

            const previousData = queryClient.getQueryData(["productos"]);

            //const { name, description, price, stock } = formData;
            const { name, description, price, stock, imageUrl } = formData?.entries() || formData; // in case is a json
            //

            const updateData = {};
            if (name !== undefined) updateData.name = name;
            if (description !== undefined) updateData.description = description;
            if (price !== undefined) updateData.price = price;
            if (stock !== undefined) updateData.stock = stock;
            if (imageUrl !== null) updateData.imageUrl = imageUrl;

            queryClient.setQueryData(["productos"], (oldProducts) => {
                return oldProducts.map(p=> p.uuid === uuid ? {...p, ...updateData} : p)
            })

            return { previousData }
        },

        onError: (error, formData, context) => {
            queryClient.setQueryData(["productos"], context.previousData)
        },
        */
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ["productos"] })
        }
        
    }, queryClient)

    return updateProductoMutation
}

export default useUpdateProducto

/** uso desde el componente
 * updateProductoMutation.mutate({
    uuid: producto.uuid,
    data: formData
})
 */