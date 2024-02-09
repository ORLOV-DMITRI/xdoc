import styles from "./ModalOverlay.module.scss";
import useHidden from "../../../../hooks/useHidden";


export default function ModalOverlay({onClose}) {

    useHidden();

    return (
        <>
            <div className={styles.overlay} onClick={onClose}></div>
        </>
    );
}