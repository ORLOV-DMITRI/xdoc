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

export type SignUpType = {
    email: string,
    password: string
}
export type SignUpResponse = {
    id: string;
    email: string;
    token: string;
}