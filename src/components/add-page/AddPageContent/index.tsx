'use client'
import styles from './AddPageContent.module.scss'
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import CodeEditor from "@/components/ui/CodeEditor";
import {useEffect, useState} from "react";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import {RecordType, SaveRecordType, SectionType} from "@/types/types";
import {useAddRecord} from "@/react-query/record/useAddRecord";
import Modal from "@/components/ui/Modal";
import {useAddSection} from "@/react-query/section/useAddSection";
import {useRouter} from "next/navigation";
import {useCurrentUser} from "@/react-query/auth/useCurrentUser";
import {useGetSections} from "@/react-query/section/useGetSections";
import useStringComparison from "@/hooks/useStringComparison";


export default function AddPageContent() {
    const router = useRouter()
    const {data: user} = useCurrentUser()
    const {mutate: addRecord} = useAddRecord()
    const {mutate: addSection} = useAddSection()
    const sections = useGetSections()
    const {compareStrings} = useStringComparison()

    const [isOpenModal, setIsOpenModal] = useState(false)
    const [record, setRecord] = useState<RecordType>({
        title: '',
        subtitle: '',
        snippet: '',
        section: '',
    });
    const [section, setSection] = useState<string>('')


    useEffect(() => {
        console.log(user)
        if (user?.status === 200) return
        if (user?.status === 400) {
            router.push('/')
        }
    }, [user?.status])


    const handleSnippetChange = (value: string) => {
        setRecord({...record, snippet: value});
    };


    const saveSnippet = () => {
        if (record.title.trim() === '' || record.subtitle.trim() === '') {
            toast.error('Пожалуйста заполните название и описание')
            return;
        }
        if (record.section.trim() === '') {
            toast.error('Пожалуйста выберите раздел')
            return
        }
        toast.success('Ваш сниппет сохранен')
        const saveRecord: SaveRecordType = {
            ...record,
            id: user?.user.id
        }
        addRecord(saveRecord)

    }

    const saveNewSection = () => {
        if (section.trim() === '') {
            toast.error('Пожалуйста заполните название')
            return
        }
        const existingSection = sections.filter(item => compareStrings(item.name, section));

        if (existingSection.length > 0) {
            toast.error('Такой раздел уже существует')
            return;
        }
        addSection({section: section})
        setSection('')
        setIsOpenModal(false)

    }


    return (<div className={styles.addPage}>
        <h1>Добвление нового Сниппета</h1>
        <div className={styles.steps}>
            <div className={styles.step}>
                <div className={styles.stepsTitle}>
                    <h3>Шаг 1:</h3>
                    <p>Выберите раздел</p>
                </div>
                <div className={styles.section}>
                    <Select options={sections}
                            onSavedNew={() => setIsOpenModal(true)}
                            value={record.section}
                            onChange={(targetSection: string) => setRecord({...record, section: targetSection})}
                    />
                </div>
            </div>
            <div className={styles.step}>
                <div className={styles.stepsTitle}>
                    <h3>Шаг 2:</h3>
                    <p>Добавьте название и описание</p>
                </div>
                <div className={styles.fields}>
                    <Input placeholder={'Название*'} value={record.title}
                           onChange={(e) => setRecord({...record, title: e.target.value})}/>
                    <TextArea className={styles.subtitle} placeholder={'Описание*'} value={record.subtitle}
                              onChange={(e) => setRecord({...record, subtitle: e.target.value})}/>
                </div>
            </div>
            <div className={styles.step}>
                <div className={styles.stepsTitle}>
                    <h3>Шаг 4:</h3>
                    <p>Добавьте код, если нужно стили и описание</p>
                </div>
                <div className={styles.codeBlock}>
                    <CodeEditor language={'js'} code={''}
                                onChange={(value: string) => handleSnippetChange(value)}
                    />
                </div>
                <div className={styles.btnBlock}>
                    <Button className={styles.saveSnippetBtn} variant={'green'} onClick={saveSnippet}>
                        Сохранить Сниппет
                    </Button>
                </div>

            </div>
        </div>
        <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
            <div className={styles.createSection}>
                <div className={styles.createSectionTitle}>Создание нового раздела</div>
                <Input placeholder={'Название*'} value={section} className={styles.createSectionInput}
                       onChange={(e) => setSection(e.target.value)}/>
                <Button className={styles.createSectionBtn} variant={'green'} onClick={saveNewSection}>
                    Сохранить
                </Button>
            </div>
        </Modal>
    </div>);
};
