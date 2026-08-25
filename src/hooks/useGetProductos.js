import { get } from "../api/fetchClient";
import { useQuery } from "@tanstack/react-query";

const getProductos = async () => {
    const data = await get("/productos")
    return data
}

const useGetProductos = () => {
    const {data, isLoading, isError, isFetching, refetch} = useQuery({
        queryFn: getProductos,
        queryKey: ["productos"],
        staleTime: 1000 * 60 * 60 * 24
    })
    const categorizedData = data ? Object.values(Object.groupBy(data, ({category}) => String(category))) : data
    console.log(JSON.stringify(categorizedData)) // una lista con listas de objetos, con tantas keys como categorias, hay q manipular los datos diferente
    console.log(data) // una lista de objetos
    
    return {data, categorizedData, isLoading, isError, isFetching, refetch}
}

export default useGetProductos