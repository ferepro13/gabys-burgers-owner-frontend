import { del } from "../api/fetchClient";
import {useMutation, useQueryClient} from "@tanstack/react-query"

const deleteExtra = async (uuid) => {
  
  const data = await del(`/extras/${uuid}`);
  return data;
};

const useDeleteExtra = () => {
    const queryClient = useQueryClient()

    const deleteExtraMutation = useMutation({
        mutationFn:deleteExtra,
        mutationKey: ["extra-delete"],
        
        onMutate: async (uuid) => {
            await queryClient.cancelQueries([{queryKey: ["extras"]}]);

            const previousData = queryClient.getQueryData(["extras"]);

            queryClient.setQueryData(["extras"], (oldProducts) => {
                return oldProducts.filter(p=> p.uuid !== uuid )
            })

            return previousData;
        },

        onError: (error, formData, context) => {
            queryClient.setQueryData(["extras"], context.previousData)
        },

        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ["extras"] })
        }
        
    }, queryClient)

    return deleteExtraMutation
}

export default useDeleteExtra