'use client'
import styles from './CodeEditor.module.scss'
import React, {Fragment, useState} from 'react';
import Editor from 'react-simple-code-editor';
import {Highlight, themes} from "prism-react-renderer"

const exampleCode = `
`


type CodeType = {
    code?: string
    language: string
    onChange: (value: string) => void
}


export default function CodeEditor({language, code, onChange}: CodeType) {

    const [currentCode, setCurrentCode] = useState(code ? code : 'RecordDetail Code');

    const onValueChange = (code: string) => {
        setCurrentCode(code);
        onChange(code)
    };


    const test = (code: string) => (
        <Highlight theme={themes.oceanicNext} code={code} language="jsx">
            {({className, style, tokens, getLineProps, getTokenProps}) => (
                <Fragment>
                    {tokens.map((line, i) => {
                        const {key, ...lineProps} = getLineProps({line, key: i});
                        return (
                            <div key={i} {...lineProps}>
                                {line.map((token, key) => {
                                    const {key: tokenKey, ...tokenProps} = getTokenProps({token, key});
                                    return <span key={key} {...tokenProps} />
                                })}
                            </div>
                        );
                    })}
                </Fragment>
            )}
        </Highlight>
    )

    return (
        <Editor
            value={currentCode}
            onValueChange={onValueChange}
            highlight={code => test(code)}
            padding={10}
            className={styles.editor}
        />
    );
};

/*
const highlight = (code: string) => (
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
);*/
