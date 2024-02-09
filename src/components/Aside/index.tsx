'use client'
import styles from './Aside.module.scss'
import {asideMok} from "@/components/Aside/asideMok";
import {useState} from "react";
import Modal from "@/components/ui/Modal";
import SearchButton from "@/components/ui/SearchButton";
import Search from "@/components/Search";
import BookIcon from '/public/svg/book.svg'
import {usePathname} from "next/navigation";
import cn from "classnames";
import useOpenSearchModal from "@/hooks/useOpenSearchModal";

export default function Aside() {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const path = usePathname()

    useOpenSearchModal(() => setIsOpenModal(true))
    return (
        <div className={styles.aside}>

            <div className={styles.wrapper}>
                <div className={styles.search}>
                    <SearchButton onOpenModal={() => setIsOpenModal(true)}/>
                </div>
                <div className={cn(styles.info, path === '/' && styles.infoActive)}>
                    <div className={cn(styles.infoItem)}>
                        <BookIcon/>
                        Введение
                    </div>
                </div>
                <ul className={styles.categoryList}>
                    {asideMok.map(category => (
                        <li className={styles.category} key={category.id}>
                            <div className={styles.categoryName}>{category.category}</div>
                            <ul className={styles.categoryItems}>
                                {category.items.map(item => (
                                    <li className={styles.item} key={item.id}>
                                        {item.name}
                                    </li>
                                ))}
                            </ul>

                        </li>
                    ))}
                </ul>

            </div>

            <Modal className={styles.searchModal} isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
                <Search onCloseModal={() => setIsOpenModal(false)}/>
            </Modal>
        </div>
    );
};
