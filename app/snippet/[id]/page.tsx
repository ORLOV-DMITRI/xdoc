import styles from './index.module.scss'
import Code from "@/components/ui/Code";
import {getRecordsById} from "@/react-query/record/useGetRecordById";
import {Record} from "@/types/types";



export default async function RecordDetail({params}: { params: { id: string } }) {
    const {record}: {record: Record} = await getRecordsById(params.id);




    return (
        <div className={styles.snippet}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <h1 className={styles.title}>{record.title}</h1>
                    <p className={styles.subtitle}>{record.subtitle}</p>
                </div>
                <div className={styles.info}>
                    <Code code={record.snippet}/>
                </div>
            </div>
        </div>
    );
};
