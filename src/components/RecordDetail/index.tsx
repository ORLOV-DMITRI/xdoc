import styles from './index.module.scss'
import Code from "@/components/ui/Code";
import {page} from "@/components/RecordDetail/snippetMok";


export default function RecordDetail() {

    const {title, snippet, subtitle} = page;
    return (
        <div className={styles.snippet}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.subtitle}>{subtitle}</p>
                </div>
                <div className={styles.info}>
                    <Code code={snippet}/>
                </div>
            </div>
        </div>
    );
};
