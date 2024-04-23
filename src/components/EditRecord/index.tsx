'use client'
import styles from './index.module.scss'
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import Select from "@/components/ui/Select";
import CodeEditor from "@/components/ui/CodeEditor";
import {Record} from "@/types/types";
import {useGetSections} from "@/react-query/section/useGetSections";
import {EditRecordMenu} from "@/components/EditRecordMenu";
import {useEditRecord} from "@/react-query/record/useEditRecotd";
import {useRouter} from "next/navigation";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import useStringComparison from "@/hooks/useStringComparison";
import {useAddRecord} from "@/react-query/record/useAddRecord";
import {useAddSection} from "@/react-query/section/useAddSection";


type EditPageType = {
    record: Record
}


export default function EditRecord({record}: EditPageType) {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [section, setSection] = useState<string>('')

    const [currentRecord, setCurrentRecord] = useState<Record>(record);
    const {mutate: editRecord} = useEditRecord()
    const sections = useGetSections()
    const {compareStrings} = useStringComparison()
    const {mutate: addSection} = useAddSection()

    const router = useRouter()

    useEffect(() => {
        if(!record) return
        setCurrentRecord(record)
    }, [record])
    const currentSection = sections.find((item) => item.id === record?.sectionsId)

    const handleSnippetChange = (value: string) => {
        setCurrentRecord({...currentRecord, snippet: value});
    };
    const [selectSection, setSelectSection] = useState('')

    useEffect(() => {
        if(sections.length === 0) return
        setSelectSection(sections[0].name)
    },[sections])

    const handleUpdateSection = (targetSection: string) => {
        const newSection = sections.find((item) => item.name === targetSection);
        if(!newSection) return
        setCurrentRecord(prevState => {
            return {
                ...prevState,
                sectionsId: newSection.id
            }
        });
    }

    const saveSnippet = () => {
        if(currentRecord.sectionsId.trim() === '') {
            toast.error('Пожалуйста выберите раздел')
            return
        }
        if (currentRecord.title.trim() === '' || currentRecord.subtitle.trim() === '') {
            toast.error('Пожалуйста заполните название и описание')
            return;
        }

        toast.success('Ваш сниппет сохранен')
        editRecord(currentRecord)
        router.push(`/snippet/${currentRecord.id}`)


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

    if(!currentRecord) {
        return  <div>Loading</div>
    }

    return (
        <>
            <div className={styles.addPage}>
                <h1>Редактирование Сниппета</h1>
                <div className={styles.steps}>
                    <div className={styles.step}>
                        <div className={styles.stepsTitle}>
                            <p>Измените название и описание, если нужно</p>
                        </div>
                        <div className={styles.fields}>
                            <Input placeholder={'Название*'} value={currentRecord?.title}
                                   onChange={(e) => setCurrentRecord({...currentRecord, title: e.target.value})}/>
                            <TextArea className={styles.subtitle} placeholder={'Описание*'}
                                      value={currentRecord.subtitle}
                                      onChange={(e) => setCurrentRecord({...currentRecord, subtitle: e.target.value})}/>
                        </div>
                    </div>
                    <div className={styles.step}>
                        <div className={styles.stepsTitle}>
                            <p>Измените раздел, если нужно</p>
                        </div>
                        <div className={styles.section}>
                            <Select options={sections}
                                    onSavedNew={() => setIsOpenModal(true)}
                                    value={currentSection?.name ? currentSection.name : ''}
                                    onChange={(targetSection: string) => handleUpdateSection(targetSection)}
                            />
                        </div>
                    </div>
                    <div className={styles.step}>
                        <div className={styles.stepsTitle}>
                            <p>Добавьте или измените код, если нужно стили и описание</p>
                        </div>
                        <div className={styles.codeBlock}>
                            <CodeEditor language={'js'} code={currentRecord.snippet}
                                        onChange={(value: string) => handleSnippetChange(value)}
                            />
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
            </div>

            <EditRecordMenu saveSnippet={saveSnippet}/>
        </>
    );
};
