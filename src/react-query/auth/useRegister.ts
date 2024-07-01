'use client'
import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {queryKeys} from "@/react-query/constants";
import {SignUpResponse, SignUpType} from "@/types/types";
import Cookies from 'js-cookie';

export const registerUser = async (newUserData: SignUpType) :  Promise<{id: string, email: string, token: string}> => {
    const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUserData),
    })
    const responseJson = await res.json();
        console.log(responseJson);
        
    return responseJson
}

export const useRegister = () => {
    const queryClient = useQueryClient();

    const {mutate} = useMutation({

        mutationFn: (newUserData: SignUpType) => registerUser(newUserData),

        onSuccess: (response: SignUpResponse) => {
            if (response?.message) {
                toast.error(response.message)
            } else {
                if (response.token !== undefined && response.token !== 'undefined') {
                    queryClient.invalidateQueries({queryKey: [queryKeys.user]});
                    Cookies.set('token', response.token, {expires: 30}); // Сохраняем токен в куки на 7 дней
                    toast.success(`Успешная регистрация`)
                }
            }
        },
        onError: (error) => {
            toast.error(`Ошибка! ${error}`)
        }
    })

    return {mutate}
}
