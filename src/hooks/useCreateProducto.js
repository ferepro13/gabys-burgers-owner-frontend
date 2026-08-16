import { post } from "../api/fetchClient";
import {useMutation, useQueryClient} from "@tanstack/react-query"

const createProduct = async (formData) => {
  // formData es un objeto FormData
  const data = await post('/productos', formData);
  return data;
};

const useCreateProduct = () => {
    const queryClient = useQueryClient()

    const createProductoMutation = useMutation({
        mutationFn:createProduct,
        mutationKey: ["producto-create"],
        
        onMutate: async (formData) => {
            await queryClient.cancelQueries([{queryKey: ["productos"]}]);

            const previousData = queryClient.getQueryData(["productos"]);
            
            //const { name, description, price, stock } = formData;
            const { name, description, price, stock } = formData.entries();

            //const uuid = previousData?.length + 1;
            const tempId = `temp-${crypto.randomUUID()}`

            queryClient.setQueryData(["productos"], (oldProducts) => {
                return [...oldProducts, {tempId, name, description, imageUrl:"", price, stock }]
            })

            return { previousData }
        },

        onError: (error, formData, context) => {
            queryClient.setQueryData(["productos"], context.previousData)
        },

        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ["productos"] })
        }
        
    }, queryClient)

    return createProductoMutation
}

export default useCreateProduct