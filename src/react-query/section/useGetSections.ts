import {queryKeys} from "@/react-query/constants";
import {useQuery} from "@tanstack/react-query";
import {SectionType} from "@/types/types";

export const getSections = async () :  Promise<SectionType[]> => {
    const res = await fetch('/api/sections', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return res.json();
}

export function useGetSections() {
    const {data = [], error, isError, isLoading} = useQuery({
        queryKey: [queryKeys.sections],
        queryFn: getSections,
    });
    return data;
}
