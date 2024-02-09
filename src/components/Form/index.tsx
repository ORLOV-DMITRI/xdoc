'use client'
import styles from './Form.module.scss'
import {FormEvent, useState} from "react";

interface Snippet {
    title: string;
    snippet: string;
    style: string;
    language: string;
    description: string;
}

interface Record {
    title: string;
    subtitle: string;
    snippets: Snippet[];
}

export default function Form() {


    const [record, setRecord] = useState<Record>({
        title: '',
        subtitle: '',
        snippets: [{title: '', snippet: '', style: '', language: 'jsx', description: ''}]
    });

    const handleSnippetChange = (index: number, field: keyof Snippet, value: string) => {
        const newSnippets = [...record.snippets];
        newSnippets[index][field] = value;
        setRecord({...record, snippets: newSnippets});
    };

    const addSnippet = () => {
        const newSnippet: Snippet = {title: '', snippet: '', style: '', language: 'jsx', description: ''};
        setRecord({...record, snippets: [...record.snippets, newSnippet]});
    };

    const removeSnippet = (index: number) => {
        const newSnippets = [...record.snippets];
        newSnippets.splice(index, 1);
        setRecord({...record, snippets: newSnippets});
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(e)
    }

    return (<div className={styles.form}>
        <form onSubmit={(e) => handleSubmit(e)}>
            <input
                type="text"
                value={record.title}
                onChange={(e) => setRecord({...record, title: e.target.value})}
                placeholder="Title"
            />
            <textarea
                value={record.subtitle}
                onChange={(e) => setRecord({...record, subtitle: e.target.value})}
                placeholder="Subtitle"
            />
            {record.snippets.map((snippet, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={snippet.title}
                        onChange={(e) => handleSnippetChange(index, 'title', e.target.value)}
                        placeholder="Snippet Title"
                    />
                    <textarea
                        value={snippet.snippet}
                        onChange={(e) => handleSnippetChange(index, 'snippet', e.target.value)}
                        placeholder="Snippet Code"
                    />
                    <textarea
                        value={snippet.style}
                        onChange={(e) => handleSnippetChange(index, 'style', e.target.value)}
                        placeholder="Snippet CSS"
                    />
                    <select
                        value={snippet.language}
                        onChange={(e) => handleSnippetChange(index, 'language', e.target.value)}
                    >
                        <option value="jsx">JSX</option>
                        <option value="scss">SCSS</option>
                        {/* Добавьте другие языки по необходимости */}
                    </select>
                    <textarea
                        value={snippet.description}
                        onChange={(e) => handleSnippetChange(index, 'description', e.target.value)}
                        placeholder="Description"
                    />
                    <button type="button" onClick={() => removeSnippet(index)}>Remove</button>
                </div>
            ))}
            <button type="button" onClick={addSnippet}>Add Snippet</button>
            <button type="submit">Submit</button>
        </form>

    </div>);
};