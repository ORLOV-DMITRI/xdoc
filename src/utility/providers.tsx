'use client'
import {ReactNode} from "react";
import {Toaster} from "react-hot-toast";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()
export default function Providers({children}: Readonly<{ children: ReactNode; }>) {


    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster/>
        </QueryClientProvider>
    )
}
