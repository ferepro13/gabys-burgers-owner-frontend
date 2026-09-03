import { del } from "../api/fetchClient";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const deletePedido = async (uuid) => {
    const data = await del(`/pedidos/${uuid}`);
    return data;
}

const useDeletePedido = () => {
    const queryClient = useQueryClient();

    const deletePedidoMutation = useMutation({
        mutationFn:deletePedido,
        mutationKey:["pedido-delete"],

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pedidos"] })
        }
    }, queryClient)

    return deletePedidoMutation
}

export default useDeletePedido