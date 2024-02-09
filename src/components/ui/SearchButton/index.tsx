import styles from './SearchButton.module.scss'
import SearchIcon from '/public/svg/search.svg'
import {useState} from "react";

type SearchButtonType = {
    onOpenModal: () => void
}

export default function SearchButton({onOpenModal}: SearchButtonType) {
    return (
        <div className={styles.searchBox} onClick={onOpenModal}>
            <div className={styles.searchContainer}>
                <SearchIcon/>
                Быстрый поиск...
                <span>Ctrl K</span>
            </div>
        </div>
    );
};