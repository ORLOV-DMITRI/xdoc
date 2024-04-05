'use client'
import {useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/react-query/constants";
import {CurrentUser} from "../../../server/auth-server";


// export function useUser() {
//     const {data, error, isError, isLoading} = useQuery({
//         queryKey: [queryKeys.user],
//         queryFn: CurrentUser,
//     });
//     return data;
// }
