'use client'

import {useRouter} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";
import {queryKeys} from "@/react-query/constants";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export function useLogout() {
    const router = useRouter();
    const queryClient = useQueryClient();

    return () => {
        Cookies.remove('token')
        queryClient.invalidateQueries({queryKey: [queryKeys.user]})
        queryClient.clear();
        toast.success(`Вы вышли из приложения`)
        router.push('/');
    };
}