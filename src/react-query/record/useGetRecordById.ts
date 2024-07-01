import {queryKeys} from "@/react-query/constants";
import { useQuery } from '@tanstack/react-query';

export const getRecordsById = async (id: string)  => {
    const url = `/api/record/getById?id=${id}`
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (!res.ok) {
        console.log('Server responded with an error:', res.status, await res.text());
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    return  res.json();
}

export function useGetRecordsById(id: string) {

    const {data = [], isPending} = useQuery({
        queryKey: [queryKeys.records, id],
        queryFn: async ({ queryKey }) => {
            const actualId = queryKey[1];
            return getRecordsById(actualId);
        },
    });
    return data;
}
