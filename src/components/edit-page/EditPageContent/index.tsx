'use client'
import styles from './EditPageContent.module.scss'
import {useState} from "react";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import Select from "@/components/ui/Select";
import CodeEditor from "@/components/ui/CodeEditor";
import Button from "@/components/ui/Button";
import {RecordType, Snippet} from "@/types/types";
import DeleteIcon from '/public/svg/delete.svg'


type EditPageType = {
    record: RecordType
}
const languages = ['jsx', "tsx", 'js', 'config', 'scss', 'css'];
const sections = ['React', 'NextJs', 'JavaScript', 'CSS', 'Config']

export default function EditPageContent({record}: EditPageType) {

    const [currentRecord, setCurrentRecord] = useState<RecordType>(record);

    const [tag, setTag] = useState('')


    const handleAddTagEnter = (e: any) => {
        if (e.code === 'Enter') {
            const newTags = [...currentRecord.tags];
            newTags.push(tag)
            setCurrentRecord({...currentRecord, tags: newTags})
            setTag('')
        }
    }
    const handleDeleteTag = (deleteTag: string) => {
        const filteredTags = currentRecord.tags.filter((tag => tag !== deleteTag))
        console.log(filteredTags)
        setCurrentRecord({...currentRecord, tags: filteredTags})
    }

    const handleSnippetChange = (index: number, field: keyof Snippet, value: string) => {
        const newSnippets = [...currentRecord.snippets];
        newSnippets[index][field] = value;
        setCurrentRecord({...currentRecord, snippets: newSnippets});
    };
    const addSnippet = () => {
        const newSnippet = {title: '', snippet: '', language: 'tsx', description: ''};
        setCurrentRecord({...currentRecord, snippets: [...currentRecord.snippets, newSnippet]});
    };
    const removeSnippet = (index: number) => {
        const filteredSnippets = currentRecord.snippets.filter((_, i) => i !== index);
        setCurrentRecord({...currentRecord, snippets: filteredSnippets});
    };

    const saveSnippet = () => {
        if (currentRecord.title.trim() === '' || currentRecord.subtitle.trim() === '') {
            toast.error('Пожалуйста заполните название и описание')
        } else {
            toast.success('Ваш сниппет сохранен')
        }
        console.log(currentRecord.title)

    }
    return (<div className={styles.addPage}>
        <h1>Редактирование Сниппета</h1>
        <div className={styles.steps}>
            <div className={styles.step}>
                <div className={styles.stepsTitle}>
                    <p>Измените название и описание, если нужно</p>
                </div>
                <div className={styles.fields}>
                    <Input placeholder={'Название*'} value={currentRecord.title}
                           onChange={(e) => setCurrentRecord({...currentRecord, title: e.target.value})}/>
                    <TextArea className={styles.subtitle} placeholder={'Описание*'} value={currentRecord.subtitle}
                              onChange={(e) => setCurrentRecord({...currentRecord, subtitle: e.target.value})}/>
                </div>
            </div>
            <div className={styles.step}>
                <div className={styles.stepsTitle}>
                    <p>Измените раздел, если нужно</p>
                </div>
                <div className={styles.section}>
                    <Select options={sections}
                            value={record.section}
                            onChange={(targetSection: string) => setCurrentRecord({...record, section: targetSection})}
                    />
                </div>
            </div>
            <div className={styles.step}>
                <div className={styles.stepsTitle}>
                    <p>Измените или удалите тэги</p>
                </div>
                <div className={styles.fields}>
                    <Input placeholder={'Пишите и нажимайте enter или +'} value={tag}
                           onChange={(e) => setTag(e.target.value)} onKeyUp={handleAddTagEnter}/>
                    <div className={styles.tagList}>
                        {currentRecord.tags.map(tag => (
                            <div className={styles.tag} key={tag}>
                                <DeleteIcon onClick={() => handleDeleteTag(tag)}/>
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.step}>
                <div className={styles.stepsTitle}>
                    <p>Добавьте или измените код, если нужно стили и описание</p>
                </div>
                <div className={styles.codeBlock}>

                    {currentRecord.snippets.map((snippet, index) => (

                        <div className={styles.code} key={index}>
                            {index !== 0 && (
                                <div className={styles.dopInfo}>Добавьте еще код, если нужно стили и описание, для
                                    примеров использование или
                                    других случаев</div>

                            )}
                            <Input placeholder={'Название (не обязательно)'} value={snippet.title}
                                   onChange={(e) => handleSnippetChange(index, 'title', e.target.value)}/>

                            <div className={styles.select}>
                                <Select options={languages}
                                        value={snippet.language}
                                        onChange={(selectLang: string) => handleSnippetChange(index, 'language', selectLang)}
                                />
                            </div>
                            <CodeEditor language={'js'} code={snippet.snippet}
                                        onChange={(value: string) => handleSnippetChange(index, 'snippet', value)}
                            />
                            <div className={styles.description}>
                                <TextArea className={styles.subtitle} placeholder={'Описание'}/>
                            </div>
                            <div className={styles.btnCodeBlock}>
                                <Button className={styles.removeSnippetBtn} variant={'red'}
                                        onClick={() => removeSnippet(index)}>
                                    Удалить блок с кодом
                                </Button>
                            </div>
                        </div>

                    ))}
                    <Button className={styles.addSnippetBtn} variant={'white'} onClick={addSnippet}>Добавить
                        блок с кодом
                    </Button>
                </div>
                <div className={styles.btnBlock}>
                    <Button className={styles.saveSnippetBtn} variant={'green'} onClick={saveSnippet}>
                        Сохранить Сниппет
                    </Button>
                </div>

            </div>
        </div>

    </div>);
};