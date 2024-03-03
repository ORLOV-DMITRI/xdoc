'use client'
import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {queryKeys} from "@/react-query/constants";
import {SignUpResponse, SignUpType} from "@/types/types";
import Cookies from 'js-cookie';
import {RegisterUser} from "../../../server/auth-server";


export const useRegister = () => {
    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationFn: (newUserData: SignUpType) => RegisterUser(newUserData),

        onSuccess: ({token}: SignUpResponse) => {
            toast.success(`Успешная регистрация`)
            queryClient.invalidateQueries({queryKey: [queryKeys.user]});
            Cookies.set('token', token, {expires: 30}); // Сохраняем токен в куки на 7 дней

        },
        onError: (error) => {
            toast.error(`Ошибка! ${error}`)
        }
    })

    return {mutate}
}
