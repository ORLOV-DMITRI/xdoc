import styles from './Search.module.scss'
import SearchIcon from '/public/svg/search.svg'
import EscIcon from '/public/svg/esc.svg'


type SearchType = {
    onCloseModal: () => void;
}
export default function Search({onCloseModal}: SearchType) {
    return (
        <div className={styles.search}>
            <div className={styles.searchBar}>
                <div className={styles.icon}>
                    <SearchIcon/>
                </div>
                <input className={styles.input} autoFocus={true}/>
                <div className={styles.closeBtn} onClick={onCloseModal}>
                    <EscIcon/>
                </div>
            </div>
        </div>
    );
};