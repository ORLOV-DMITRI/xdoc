import {SaveRecordType} from "@/types/types";
import {queryKeys} from "@/react-query/constants";
import {useMutation, useQueryClient} from "@tanstack/react-query";


export const editRecord = async (record : SaveRecordType)  => {

    try {
        const res = await fetch('/api/record', {
            method: 'PUT',
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

export const useEditRecord = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: (data: SaveRecordType) => editRecord(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.records]});
        }

    })
    return {mutate}
};

