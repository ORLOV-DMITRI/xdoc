import {RecordType} from "@/types/types";

export type SnippetType = {
    id: string,
    snippet: string,
    language: string
    description?: string
    style?: string
    title?: string
};


export const snippetMok1: string = `
import styles from "./ModalOverlay.module.scss";
import useHidden from "@/src/hooks/useHidden";


export default function ModalOverlay({onClose}) {

    useHidden();

    return (
        <>
            <div className={styles.overlay} onClick={onClose}></div>
        </>
    );
}
`;

export const snippetMok: string = `
"use client";

import {createPortal} from "react-dom";
import {useEffect, useState} from "react";
import styles from "./Modal.module.scss";
import cn from "classnames";
import ModalOverlay from "@/src/dev-site/ui/Modal/ModalOverlay";

export default function Modal({children, onClose, isOpen}) {
    const [mounted, setMounted] = useState(false);

    const keydownHandler = ({key}) => {
        switch (key) {
            case "Escape":
                onClose();
                break;
            default:
        }
    };


    useEffect(() => {
        document.addEventListener("keydown", keydownHandler);
        return () => document.removeEventListener("keydown", keydownHandler);
    });
    useEffect(() => {
        setMounted(true);
    }, []);

    return mounted && isOpen
        ? createPortal(
            <>
                <ModalOverlay onClose={onClose}/>
                <div className={cn(styles.modal)}>
                    {children}
                </div>
            </>,
            document.body
        )
        : null;
}
`;


export const page: RecordType = {
    title: 'Modal Window',
    subtitle: 'Компонент который используется для открытия модального окна и закрытия при клике вне области контента',
    snippet: snippetMok,
    section: 'React',
}
