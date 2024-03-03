import styles from './Header.module.scss'
import {Gruppo} from 'next/font/google'
import cn from "classnames";
import AuthBlock from "@/components/auth/AuthBlock";
import {CurrentUser} from "../../../../server/auth-server";

const logoFonts = Gruppo({subsets: ["latin"], weight: ['400', '400']});


export default async function Header() {
    const user = await CurrentUser()

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.nav}>
                    <div className={cn(styles.logo, logoFonts.className)}>XDOC</div>

                     <AuthBlock isAuthenticated={!!user}/>

                </div>
            </div>

        </header>
    );
};