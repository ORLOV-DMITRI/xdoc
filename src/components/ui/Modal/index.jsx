"use client";

import {createPortal} from "react-dom";
import {useEffect, useState} from "react";
import styles from "./Modal.module.scss";
import cn from "classnames";
import ModalOverlay from "./ModalOverlay";

export default function Modal({children, onClose, isOpen, className = ''}) {
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
                <div className={cn(styles.modal, className)}>
                    {children}
                </div>
            </>,
            document.body
        )
        : null;
}
