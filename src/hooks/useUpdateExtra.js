import { put } from "../api/fetchClient";
import {useMutation, useQueryClient} from "@tanstack/react-query"

const updateExtra = async ({uuid, formData}) => {
  // formData es un objeto JSON
  const data = await put(`/extras/${uuid}`, formData);
  return data;
};

const useUpdateExtra = () => {
    const queryClient = useQueryClient()

    const updateExtraMutation = useMutation({
        mutationFn:updateExtra,
        mutationKey: ["extra-update"],
        
        onMutate: async (formData, uuid) => {
            await queryClient.cancelQueries([{queryKey: ["extras"]}]);

            const previousData = queryClient.getQueryData(["extras"]);

            const { name, price, isAvailable } = formData;
            const updateData = {};
            if (name !== undefined) updateData.name = name;
            if (price !== undefined) updateData.price = price;
            if (isAvailable !== undefined) updateData.isAvailable = isAvailable;

            queryClient.setQueryData(["extras"], (oldExtras) => {
                return oldExtras.map(e=> e.uuid === uuid ? {...e, ...updateData} : e)
            })

            return { previousData }
        },

        onError: (error, formData, context) => {
            queryClient.setQueryData(["extras"], context.previousData)
        },

        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ["extras"] })
        }
        
    }, queryClient)

    return updateExtraMutation
}

export default useUpdateExtra

/* //uso desde el componente

updateExtraMutation.mutate({
    uuid: extra.uuid,
    data: {
        name,
        price,
        isAvailable
    }
})
    */