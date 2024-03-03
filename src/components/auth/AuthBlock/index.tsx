'use client'
import styles from './AuthBlock.module.scss'
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import AuthModal from "@/components/auth/AuthModal";
import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

type AuthBlockType = {
    isAuthenticated: boolean
}


export default function AuthBlock({isAuthenticated}: AuthBlockType) {
    const [isOpenModal, setIsOpenModal] = useState(false)

    const router = useRouter();
    const path = usePathname()

    const handleLogout = () => {
        Cookies.remove('token')
        router.refresh()
    }

    return (
        <div>
            {isAuthenticated ? (
                <div className={styles.right}>
                    {path !== '/add' && (
                        <Link href={'/add'}>
                            <Button variant={'white'} className={styles.btnAdd}>
                                Создать Snippet
                            </Button>
                        </Link>
                    )}

                    <div className={styles.logIn}>
                        <Button className={styles.btn} variant={'red'} onClick={handleLogout}
                        >Выйти</Button>
                    </div>
                </div>

            ) : (
                <div className={styles.logIn}>
                    <Button className={styles.btn} variant={'white'}
                            onClick={() => setIsOpenModal(true)}>Войти</Button>
                </div>
            )}
            <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
                <AuthModal onClose={() => setIsOpenModal(false)}/>
            </Modal>
        </div>);
};