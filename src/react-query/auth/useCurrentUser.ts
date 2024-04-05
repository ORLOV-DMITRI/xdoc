import {useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/react-query/constants";

export const currentUser = async () :  Promise<{user: {id: string, email: string, password: string}, status: number}> => {
    const res = await fetch('/api/user/current', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return res.json();
}

export function useCurrentUser() {
    const {data, error, isError, isLoading} = useQuery({
        queryKey: [queryKeys.user],
        queryFn: currentUser,
    });
    return {data, isLoading};
}
