'use client'
import styles from './Header.module.scss'
import {Gruppo} from 'next/font/google'
import cn from "classnames";
import {useCurrentUser} from "@/react-query/auth/useCurrentUser";
import Link from "next/link";
import UserActions from "@/components/UserActions";

const logoFonts = Gruppo({subsets: ["latin"], weight: ['400', '400']});


export default function Header() {
    const {data: user, isLoading} = useCurrentUser()

    const isAuth = user?.status === 200;


    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.nav}>
                    <Link href={'/'} className={cn(styles.logo, logoFonts.className)}>XDOC</Link>

                    {isLoading ? (<div>Загрузка</div>) :
                        (<UserActions isAuthenticated={isAuth}/>)}
                </div>
            </div>

        </header>
    );
};
