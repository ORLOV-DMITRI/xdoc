import {SaveRecordType} from "@/types/types";
import {queryKeys} from "@/react-query/constants";
import {useMutation, useQueryClient} from "@tanstack/react-query";


export const addRecord = async (record : SaveRecordType)  => {

    try {
        const res = await fetch('/api/record', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(record),
        })
        return res.json();
    }catch (error) {
        throw new Error('Ошибка')
    }

}

export const useAddRecord = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: (data: SaveRecordType) => addRecord(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.records]});
        }

    })
    return {mutate}
};

