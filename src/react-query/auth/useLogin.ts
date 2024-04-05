import {useMutation, useQueryClient} from '@tanstack/react-query';
import toast from "react-hot-toast";
import {queryKeys} from "@/react-query/constants";
import {SignUpResponse, SignUpType} from "@/types/types";
import Cookies from "js-cookie";

export const loginUser = async (userData: SignUpType) :  Promise<{id: string, email: string, token: string}> => {
    const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    return res.json();
}

export const useLogIn = () => {
    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationFn: (userData: SignUpType) => loginUser(userData),
        onSuccess: ({token}: SignUpResponse) => {
            toast.success(`Успешная авторизация`)
            Cookies.set('token', token, {expires: 30});
            queryClient.invalidateQueries({queryKey: [queryKeys.user]});

        },
        onError: (error) => {
            // @ts-ignore
            toast.error(`Ошибка! ${error}`)
        }
    })
    return {mutate}
};

