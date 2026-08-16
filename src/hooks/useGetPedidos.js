import { get } from '../api/fetchClient';
import { useQuery } from '@tanstack/react-query';

const getPedidos = async (sortBy = 'createdAt', order = 'DESC') => {
  const data = await get(`/pedidos?sortBy=${sortBy}&order=${order}`);
  return data;
};

const useGetPedidos = () => {
    const {data, isLoading, isError, isFetching, refetch} = useQuery({
        queryFn: getPedidos,
        queryKey: ["pedidos"],
        staleTime: 1000 * 60 * 5
    })

    return {data, isLoading, isError, isFetching, refetch}
}

export default useGetPedidos