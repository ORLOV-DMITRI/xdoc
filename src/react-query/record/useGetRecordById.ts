import {queryKeys} from "@/react-query/constants";
import { useQuery } from '@tanstack/react-query';

export const getRecordsById = async (id: string)  => {
    const res = await fetch(`${process.env.URL}/api/record/getById?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return  res.json();
}

export function useGetRecords(id: string) {
    const {data = []} = useQuery({
        queryKey: [queryKeys.records, id],
        queryFn: async ({ queryKey }) => {
            const actualId = queryKey[1];
            return getRecordsById(actualId);
        },
    });
    return data;
}
