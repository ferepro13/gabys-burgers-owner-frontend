import { del } from "../api/fetchClient";
import {useMutation, useQueryClient} from "@tanstack/react-query"

const deleteProducto = async (uuid) => {
  // formData es un objeto FormData
  const data = await del(`/productos/${uuid}`);
  return data;
};

const useDeleteProducto = () => {
    const queryClient = useQueryClient()

    const deleteProductoMutation = useMutation({
        mutationFn:deleteProducto,
        mutationKey: ["producto-delete"],
        
        onMutate: async (uuid) => {
            await queryClient.cancelQueries([{queryKey: ["productos"]}]);

            const previousData = queryClient.getQueryData(["productos"]);

            queryClient.setQueryData(["productos"], (oldProducts) => {
                return oldProducts.filter(p=> p.uuid !== uuid )
            })

            return previousData;
        },

        onError: (error, formData, context) => {
            queryClient.setQueryData(["productos"], context.previousData)
        },

        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ["productos"] })
        }
        
    }, queryClient)

    return deleteProductoMutation
}

export default useDeleteProducto