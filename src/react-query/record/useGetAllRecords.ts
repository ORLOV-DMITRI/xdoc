import {useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/react-query/constants";
import {Section} from "@/types/types";

export const getRecords = async ()  => {
    const res = await fetch('/api/record', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return res.json();
}

export function useGetRecords() {
    const {data = [], error, isError, isLoading, isPlaceholderData} = useQuery({
        queryKey: [queryKeys.records],
        queryFn: getRecords,
        
    });
    return data;
}
