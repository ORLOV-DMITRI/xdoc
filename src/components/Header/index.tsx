import styles from './Header.module.scss'
import Image from "next/image";
import Logo from "/public/img/logo.png"
import {Major_Mono_Display} from 'next/font/google'
import {Gruppo} from 'next/font/google'
import cn from "classnames";

// const logoFonts = Major_Mono_Display({subsets: ["latin"], weight: ['400', '400']});
const logoFonts = Gruppo({subsets: ["latin"], weight: ['400', '400']});


export default function Header() {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.nav}>
                    <div className={cn(styles.logo, logoFonts.className)}>XDOC</div>
                </div>

            </div>
        </header>
    );
};