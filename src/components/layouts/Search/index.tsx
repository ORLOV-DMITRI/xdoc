import styles from './Search.module.scss'
import SearchIcon from '/public/svg/search.svg'
import EscIcon from '/public/svg/esc.svg'
import {ChangeEvent, useState} from "react";
import {useSearchRecord} from "@/react-query/search/useSearchRecords";
import {debounce} from "next/dist/server/utils";
import Link from "next/link";

import SearchItem from "@/components/ui/SearchItem";

type SearchType = {
    onCloseModal: () => void;
}
export default function Search({onCloseModal}: SearchType) {
    const [searchQuery, setSearchQuery] = useState('');

    const {mutate, records} = useSearchRecord()
    const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        mutate(e.target.value);

    }, 300); // 300 ms delay


    return (
        <div className={styles.search}>
            <div className={styles.searchBar}>
                <div className={styles.icon}>
                    <SearchIcon/>
                </div>
                <input className={styles.input} onChange={handleSearch} autoFocus={true}/>
                <div className={styles.closeBtn} onClick={onCloseModal}>
                    <EscIcon/>
                </div>
            </div>
            <div className={styles.result}>
                <ul className={styles.resultList}>
                    {records && records?.map(item => (
                        <SearchItem data={item} key={item.id} onCloseModal={onCloseModal}/>
                    ))}
                </ul>

            </div>
        </div>
    );
};
