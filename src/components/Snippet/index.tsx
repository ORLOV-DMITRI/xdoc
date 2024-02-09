import styles from './Snippet.module.scss'
import Code from "@/components/ui/Code";
// @ts-ignore
import {page} from "@/components/Snippet/snippetMok";


export default function Snippet() {

    const {title, snippets, subtitle, tags} = page;
    return (
        <div className={styles.snippet}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <div className={styles.tags}>
                        {tags.map(tag => (
                            <span className={styles.tag}>{tag}</span>
                        ))}
                    </div>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.subtitle}>{subtitle}</p>
                </div>
                <div className={styles.info}>
                    {snippets.map(snippet => (
                        <div className={styles.infoBlock} key={snippet.title}>
                            <h2 className={styles.blockTitle}>{snippet.title}</h2>
                            <Code code={snippet.snippet} language={snippet.language}/>
                            <div className={styles.description}>
                                {snippet.description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};