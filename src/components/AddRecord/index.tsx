import styles from './AddRecord.module.scss'
import AddSvg from '/public/svg/add.svg'
import Button from "@/components/ui/Button";

export default function AddRecord() {


    return (
            <Button variant={'white'} className={styles.btn}>
                Создать Snippet
            </Button>
    );
};