'use client'
import styles from './AddPageContent.module.scss'
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import CodeEditor from "@/components/ui/CodeEditor";
import {useState} from "react";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import DeleteIcon from '/public/svg/delete.svg'
import {RecordType, Snippet} from "@/types/types";

const options = [
    {value: 'jsx', label: 'JSX'},
    {value: 'tsx', label: 'TSX'},
    {value: 'js', label: 'JS'},
    {value: 'config', label: 'Config'},
    {value: 'scss', label: 'SCSS'},
    {value: 'css', label: 'CSS'},
];
const languages = ['jsx', "tsx", 'js', 'config', 'scss', 'css'];
const sections = ['React', 'NextJs', 'JavaScript', 'CSS', 'Config']


export default function AddPageContent() {

    const [record, setRecord] = useState<RecordType>({
        title: '',
        subtitle: '',
        snippets: [],
        tags: [],
        section: '',
    });

    const [tag, setTag] = useState('')


    const handleAddTagEnter = (e: any) => {
        if (e.code === 'Enter') {
            const newTags = [...record.tags];
            newTags.push(tag)
            setRecord({...record, tags: newTags})
            setTag('')
        }
    }
    const handleDeleteTag = (deleteTag: string) => {
        const filteredTags = record.tags.filter((tag => tag !== deleteTag))
        setRecord({...record, tags: filteredTags})
    }

    const handleSnippetChange = (index: number, field: keyof Snippet, value: string) => {
        const newSnippets = [...record.snippets];
        newSnippets[index][field] = value;
        setRecord({...record, snippets: newSnippets});
    };
    const addSnippet = () => {
        const newSnippet = {title: '', snippet: '', language: 'tsx', description: ''};
        setRecord({...record, snippets: [...record.snippets, newSnippet]});
    };
    const removeSnippet = (index: number) => {
        const filteredSnippets = record.snippets.filter((_, i) => i !== index);
        setRecord({...record, snippets: filteredSnippets});
    };

    const saveSnippet = () => {
        if (record.title.trim() === '' || record.subtitle.trim() === '') {
            toast.error('Пожалуйста заполните название и описание')
        } else {
            console.log(record)
            toast.success('Ваш сниппет сохранен')
        }
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
                    <h3>Шаг 3:</h3>
                    <p>Добавьте один или более тэгов</p>
                </div>
                <div className={styles.fields}>
                    <Input placeholder={'Пишите и нажимайте enter или +'} value={tag}
                           onChange={(e) => setTag(e.target.value)} onKeyUp={handleAddTagEnter}/>
                    <div className={styles.tagList}>
                        {record.tags.map(tag => (
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
                    <h3>Шаг 4:</h3>
                    <p>Добавьте код, если нужно стили и описание</p>
                </div>
                <div className={styles.codeBlock}>

                    {record.snippets.map((snippet, index) => (

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
                            <CodeEditor language={'js'} code={snippet.title}
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