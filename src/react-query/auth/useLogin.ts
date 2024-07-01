import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from "react-hot-toast";
import { queryKeys } from "@/react-query/constants";
import { SignUpResponse, SignUpType } from "@/types/types";
import Cookies from "js-cookie";

export const loginUser = async (userData: SignUpType): Promise<{ id: string, email: string, token: string }> => {
    const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    const responseJson = await res.json();

    return responseJson
}

export const useLogIn = () => {
    const queryClient = useQueryClient();

    const { mutate, status, isError } = useMutation({
        mutationFn: (userData: SignUpType) => loginUser(userData),
        onSuccess: (response: SignUpResponse) => {    
            if (response?.message) {
                toast.error(response.message)
            } else {
                if (response.token !== undefined && response.token !== 'undefined') {
                    Cookies.set('token', response.token, { expires: 30 });
                    queryClient.invalidateQueries({ queryKey: [queryKeys.user] });
                    toast.success(`Успешная авторизация`)
                }
            }

        },
        onError: (error) => {
            // @ts-ignore
            toast.error(`Ошибка! ${error}`)
        }
    })
    return { mutate, status, isError }
};

