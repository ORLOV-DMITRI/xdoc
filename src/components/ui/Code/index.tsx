'use client'
import styles from './Code.module.scss'
import {Highlight, themes} from "prism-react-renderer"
import copy from "copy-to-clipboard";
import CopyIcon from '/public/svg/copy.svg'
import DoneIcon from '/public/svg/done.svg'
import {useEffect, useState} from "react";

const codeBlock = `
const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
  return (
    <div>
      <h2>{item.name}</h2>
      <p>Price: {item.price}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
}
`
type CodeType = {
    code?: string
    language: string
}

export default function Code({code, language}: CodeType) {
    const [isCopied, setIsCopied] = useState(false)

    const copyToClipboard = () => {
        if (code) copy(code);
        setIsCopied(true)
    };

    useEffect(() => {
        if (isCopied) {
            setTimeout(() => {
                setIsCopied(false)
            }, 1000)
        }
    }, [isCopied])

    if (!code) {
        return
    }
    return (
        <div className={styles.code}>
            <div className={styles.codeInfo}>
                <div className={styles.codeLanguage}>{language}</div>
                <div onClick={copyToClipboard} className={styles.copy}>
                    {!isCopied && (
                        <>
                            <CopyIcon/>
                            Скопировать
                        </>
                    )}
                    {isCopied && (
                        <>
                            <DoneIcon/>
                            Скопировано!
                        </>
                    )}
                </div>
            </div>

            <Highlight
                theme={themes.oceanicNext}
                code={code}
                language={language}
            >
                {({className, style, tokens, getLineProps, getTokenProps}) => (
                    <pre style={style}>
        {tokens.map((line, i) => (
            <div key={i} {...getLineProps({line})}>
                <span>  </span>
                {line.map((token, key) => (
                    <span key={key} {...getTokenProps({token})} />
                ))}
            </div>
        ))}
      </pre>
                )}
            </Highlight>
        </div>
    );
};