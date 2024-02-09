import type {Metadata} from "next";
import {IBM_Plex_Mono, Inter} from "next/font/google";
import "../public/styles/globals.scss";
import Header from "@/components/Header";
import Aside from "@/components/Aside";
import Menu from "@/components/Menu";
import {ReactNode} from "react";
import Providers from "@/utility/providers";

const inter = Inter({subsets: ["latin"]});
const ibmPlexMono = IBM_Plex_Mono({subsets: ["latin"], weight: ['400', '500', '700'], display: 'swap'});

export const metadata: Metadata = {
    title: "XDoc",
    description: "Generated by create next app",
};

export default function RootLayout({children}: Readonly<{ children: ReactNode; }>) {
    return (
        <html lang="en">
        <body className={ibmPlexMono.className}>
        <Providers>
            <Header/>
            <div className={'container main'}>
                <Aside/>
                <div className={'content'}>
                    {children}
                </div>
                <Menu/>
            </div>
        </Providers>
        </body>
        </html>
    );
}