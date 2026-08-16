import { post } from "../api/fetchClient";
import {useMutation, useQueryClient} from "@tanstack/react-query"

const createExtra = async (formData) => {
  // formData es un objeto JSON aqui
  const data = await post('/extras', formData);
  return data;
};

const useCreateExtra = () => {
    const queryClient = useQueryClient()

    const createExtraMutation = useMutation({
        mutationFn:createExtra,
        mutationKey: ["extra-create"],
        
        onMutate: async (formData) => {
            await queryClient.cancelQueries([{queryKey: ["extras"]}]);

            const previousData = queryClient.getQueryData(["extras"]);

            const { name, price } = formData; // json file
            //const uuid = previousData?.length + 1;
            const tempId = `temp-${crypto.randomUUID()}`
            const isAvailable = true;

            queryClient.setQueryData(["extras"], (oldExtras) => {
                return [...oldExtras, {tempId, name, price, isAvailable}]
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

    return createExtraMutation
}

export default useCreateExtra