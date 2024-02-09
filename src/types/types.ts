export type Snippet = {
    title: string;
    language: string;
    snippet: string;
    description: string;
}

export type RecordType = {
    title: string;
    subtitle: string;
    snippets: Snippet[];
    tags: string[];
    section: string;
}