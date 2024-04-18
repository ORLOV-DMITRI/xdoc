'use client'
import * as React from 'react';
import styles from "./styles.module.scss";
import Button from "@/components/ui/Button";
import {useDeleteRecords} from "@/react-query/record/useDeleteRecord";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

type Props = {
    saveSnippet: () => void
};

export function AddRecordMenu(props: Props) {
    const {saveSnippet} = props;


    return (
        <div className={styles.menu}>
            <div className={styles.btnBlock}>
                <Button className={styles.saveSnippetBtn} variant={'green'} onClick={saveSnippet}>
                    Сохранить Сниппет
                </Button>
            </div>
        </div>
    );
};
