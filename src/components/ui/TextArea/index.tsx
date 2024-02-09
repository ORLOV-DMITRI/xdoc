'use client'
import styles from './TextArea.module.scss'
import {ChangeEvent} from "react";
import cn from "classnames";

type TextareaType = {
    className: string
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>


export default function TextArea({ className,...props}: TextareaType) {
    const handleResizeArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + 4 + "px";
    };
    return (
        <textarea className={cn(styles.textarea, className)} onChange={(e) => handleResizeArea(e)} {...props}/>
    )
};