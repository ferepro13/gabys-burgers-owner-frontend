import { get } from "../api/fetchClient";
import { useQuery } from "@tanstack/react-query";

const getExtras = async () => {
    const data = await get("/extras")
    return data
}

const useGetExtras = () => {
    const {data, isLoading, isError, isFetching, refetch} = useQuery({
        queryFn: getExtras,
        queryKey: ["extras"],
        staleTime: 1000 * 60 * 60 * 24
    })

    return {data, isLoading, isError, isFetching, refetch}
}

export default useGetExtras;