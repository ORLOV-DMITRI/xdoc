import {queryKeys} from "@/react-query/constants";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Record} from "@/types/types";

interface SearchResult  {
    records: Record[]
}

export const searchRecords = async (query : string): Promise<SearchResult>  => {

    try {
        const res = await fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({query: query}),
        })

        const data: SearchResult = await res.json();
        return data;

    }catch (error) {
        throw new Error('Ошибка')
    }

}

export const useSearchRecord  = () => {
    const queryClient = useQueryClient();

    const {mutate, data} = useMutation<SearchResult, Error, string>({
        mutationFn: (query: string) => searchRecords(query),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.search]});
        },

    })
    const records = data?.records || []
    console.log(records)
    return {mutate, records}
};
