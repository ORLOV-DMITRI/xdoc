import {useMutation, useQueryClient} from "@tanstack/react-query";
import {queryKeys} from "@/react-query/constants";
import toast from "react-hot-toast";

export const addSection = async (section : {section: string})  => {
    try {
        const res = await fetch('/api/sections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(section),
        })
        return res.json();
    }catch (error) {
        throw new Error('Ошибка')
    }

}


export const useAddSection = () => {
    const queryClient = useQueryClient();

    const {mutate, isError, isSuccess} = useMutation({
        mutationFn: (data: {section: string}) =>  addSection(data),
        onError: (error) => {
            toast.error(`Ошибка! ${error}`)
        },
        onSuccess: (data) => {
            toast.success('Новый раздел сохранен')
            queryClient.invalidateQueries({queryKey: [queryKeys.sections]});
        },


    })
    return {mutate, isSuccess}
};
