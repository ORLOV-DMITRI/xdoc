import type {Metadata} from "next";
import {IBM_Plex_Mono, Inter} from "next/font/google";
import "../public/styles/globals.scss";
import Header from "../src/components/layouts/Header";
import Aside from "../src/components/layouts/Aside";
import {ReactNode} from "react";
import Providers from "@/utility/providers";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Menu from "@/components/Menu";

const inter = Inter({subsets: ["latin"]});
const ibmPlexMono = IBM_Plex_Mono({subsets: ["latin"], weight: ['400', '500', '700'], display: 'swap'});

export const metadata: Metadata = {
    title: "XDoc",
    description: "Generated by create next app",
};

export default async function RootLayout({children}: Readonly<{ children: ReactNode; }>) {

    
    const res = await fetch(process.env.NEXT_PUBLIC_URL + '/api/record', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const sections = await res.json();
    return (
        <html lang="en">
        <body className={ibmPlexMono.className}>
        <Providers>
            <Header/>
            <div className={'container main'}>
                <Aside sections={sections}/>
                <div className={'content'}>
                    {children}
                </div>
            </div>
            <ReactQueryDevtools/>
        </Providers>
        </body>
        </html>
    );
}
