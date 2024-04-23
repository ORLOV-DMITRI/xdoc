import styles from './style.module.scss'
import Link from "next/link";

import BookIcon from '/public/svg/book-open.svg'
import ArrowIcon from '/public/svg/arrow-mini.svg'
import {Record} from "@/types/types";


interface ISearchItem {
    data: Record
    onCloseModal: () => void;

}

export default function SearchItem({data, onCloseModal}: ISearchItem) {


    function addEllipsis(text: string, maxLength: number) {
        if (text.length > maxLength) {
            const start = text.substring(0, maxLength / 2 - 1) + '...';
            const end = text.substring(text.length - maxLength / 2 + 2);
            return '...' + start;
        }
        return text;
    }



    return (
        <li className={styles.resultItem}>
            <Link href={`/snippet/${data.id}`} className={styles.resultLink} onClick={onCloseModal}>
                <div className={styles.tagIcon}>
                    <BookIcon/>
                </div>
                <div className={styles.searchInfo}>
                    <div className={styles.recordTitle}>{data.title}</div>
                    <div className={styles.recordSubtitle}>
                        {addEllipsis(data.subtitle, 80)}
                    </div>
                </div>
                <div className={styles.goIcon}>
                    <ArrowIcon/>
                </div>
            </Link>
        </li>
    );
};

