import {useMutation, useQueryClient} from '@tanstack/react-query';
import toast from "react-hot-toast";
import {queryKeys} from "@/react-query/constants";
import {SignUpResponse, SignUpType} from "@/types/types";
import {LogInUser} from "../../../server/auth-server";
import Cookies from "js-cookie";



export const useLogIn = () => {
    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationFn: (userData: SignUpType) => LogInUser(userData),
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

