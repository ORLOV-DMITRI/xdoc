'use client'
import styles from './Aside.module.scss'
import {useState} from "react";
import Modal from "@/components/ui/Modal";
import SearchButton from "@/components/ui/SearchButton";
import Search from "../Search";
import BookIcon from '/public/svg/book.svg'
import {usePathname} from "next/navigation";
import cn from "classnames";
import useOpenSearchModal from "@/hooks/useOpenSearchModal";
import {useGetRecords} from "@/react-query/record/useGetAllRecords";
import {Section} from "@/types/types";
import Link from "next/link";

export default function Aside({sections}: { sections: Section[] }) {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const path = usePathname()
    useOpenSearchModal(() => setIsOpenModal(true))

    const allSections = useGetRecords(sections)

    const sectionsArray: Section[] = allSections.sections;

    const uuidRegex = /[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}/;


    const extractIdFromPath = (path: string) => {
        const match = path.match(uuidRegex);
        return match ? match[0] : null;
    };

    const id = extractIdFromPath(path);


    return (
        <div className={styles.aside}>

            <div className={styles.wrapper}>
                <div className={styles.search}>
                    <SearchButton onOpenModal={() => setIsOpenModal(true)}/>
                </div>
                <div className={cn(styles.info, path === '/' && styles.infoActive)}>
                    <Link href={'/'} className={cn(styles.infoItem)}>
                        <BookIcon/>
                        Введение
                    </Link>
                </div>
                <ul className={styles.categoryList}>
                    {sectionsArray?.map(category => (
                        <li className={styles.category} key={category.id}>
                            <div className={styles.categoryName}>{category.name}</div>
                            <ul className={styles.categoryItems}>
                                {category.records.map(item => (
                                    <Link href={`/snippet/${item.id}`}
                                          className={cn(styles.item, item.id === id && styles.active)} key={item.id}>
                                        {item.title}
                                    </Link>
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
