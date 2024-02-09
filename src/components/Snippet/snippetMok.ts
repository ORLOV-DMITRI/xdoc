import {RecordType, Snippet} from "@/types/types";

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
const snippetMok2: string = `
import {useEffect} from "react";

function useHidden() {
    useEffect(() => {
        const paddingOffset = '\${window.innerWidth - document.body.offsetWidth}px';

        document.body.setAttribute("style", \`overflow: hidden; padding-right: \${paddingOffset}\`);

        return () => {
            document.body.setAttribute("style", "overflow: visible; padding-right: 0");

        };
    }, []);
}

export default useHidden;
`
export const snippetMok5: string = `

export default function Aside() {
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <div className={styles.aside}>
            //остальной код
            </div>

            <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
                <Search/> // Контент который будет в модальном окне
            </Modal>;
        </div>
    );
};
`;


const stylesMok1 = `
.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    z-index: 1000;
    
}
`
const stylesMok2 = `
.overlay{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(47, 58, 101, 0.55);
    z-index: 999;
}
`
const snippetMok4 = ``

export const snippets: Snippet[] = [
    {
        title: 'Modal',
        snippet: snippetMok,
        language: 'jsx',
        description: ' В качестве пропсов принимает функцию закрытия окна onClose и состояние окна isOpen. Внутри себя использует компонент ModalOverlay',

    },
    {
        title: 'ModalOverlay',
        snippet: snippetMok1,
        language: 'jsx',
        description: 'Накладывает задний фон для модального окна, использует useHidden для блокировки скролла',
    },
    {
        title: 'useHidden',
        snippet: snippetMok2,
        language: 'jsx',
        description: 'Блокирует скролл, и высчитывает отступ вместо скрол бара',
    },
    {
        title: 'Пример использования',
        snippet: snippetMok5,
        language: 'jsx',
        description: 'Блокирует скролл, и высчитывает отступ вместо скрол бара',

    },
]

type Page = {
    title: string,
    subtitle: string,
    snippets: SnippetType[],
    tags: string
}

export const page: RecordType = {
    title: 'Modal Window',
    subtitle: 'Компонент который используется для открытия модального окна и закрытия при клике вне области контента',
    snippets: snippets,
    tags: ['React'],
    section: 'React',
}