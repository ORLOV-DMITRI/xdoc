import {useMutation, useQueryClient} from "@tanstack/react-query";
import {queryKeys} from "@/react-query/constants";
import toast from "react-hot-toast";

export const deleteRecordsById = async (id: string)  => {
    const res = await fetch(`/api/record?id=${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return  res.json();
}

export function useDeleteRecords() {
    const queryClient = useQueryClient();

    const {mutate, isSuccess} = useMutation({
        mutationFn: (id: string) => deleteRecordsById(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.records]});
            toast('Запись удалена');

        }

    })
    return {mutate, isSuccess}

}
