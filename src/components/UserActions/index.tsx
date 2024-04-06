'use client'
import styles from './index.module.scss'
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import AuthModal from "../AuthModal";
import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import {logout} from "@/react-query/auth/useLogOut";
import {useQueryClient} from "@tanstack/react-query";
import {queryKeys} from "@/react-query/constants";
import toast from "react-hot-toast";

type AuthBlockType = {
    isAuthenticated: boolean
}


export default function UserActions({isAuthenticated}: AuthBlockType) {
    const [isOpenModal, setIsOpenModal] = useState(false)

    const path = usePathname()
    const router = useRouter();
    const queryClient = useQueryClient();

    const handleLogout = () => {
        Cookies.remove('token')
        queryClient.invalidateQueries({queryKey: [queryKeys.user]})
        toast.success(`Вы вышли из приложения`)
        router.push('/');
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
                        <Button className={styles.btn} variant={'red'} onClick={handleLogout}>Выйти</Button>
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
