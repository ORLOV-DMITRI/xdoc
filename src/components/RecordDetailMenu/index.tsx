'use client'
import * as React from 'react';
import styles from "./styles.module.scss";
import Button from "@/components/ui/Button";
import {useDeleteRecords} from "@/react-query/record/useDeleteRecord";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";

type Props = {
    id: string
};

export function RecordDetailMenu(props: Props) {
    const {id} = props;
    const router = useRouter()
    const {mutate: deleteRecord, isSuccess} = useDeleteRecords();

    useEffect(() => {
        if (isSuccess) {
            router.push('/')
        }
    }, [isSuccess])

    const handleEditPage = () => {
        router.push(`/edit/${id}`)
    }

    return (
        <div className={styles.menu}>
            <div className={styles.btnBlock}>
                <Button className={styles.saveSnippetBtn} variant={'white'} onClick={handleEditPage}>
                        Редактировать
                </Button>
                <Button className={styles.saveSnippetBtn} variant={'red'} onClick={() => deleteRecord(id)}>
                    Удалить
                </Button>
            </div>
        </div>
    );
};
