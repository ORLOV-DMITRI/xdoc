'use client'
import {ReactNode} from "react";
import {Toaster} from "react-hot-toast";

export default function Providers({children}: Readonly<{ children: ReactNode; }>) {


    return (
        <div>
            {children}
            <Toaster/>
        </div>
    )
}