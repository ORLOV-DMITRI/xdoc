export type RecordType = {
    title: string;
    subtitle: string;
    snippet: string;
    section: string;
}

export type SaveRecordType = {
    id?: string
} & RecordType

export type SectionType = {
    id: string
    name: string;
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
export interface Root {
    sections: Section[]
}

export interface Section {
    id: string
    name: string
    records: Record[]
}

export interface Record {
    id: string
    title: string
    subtitle: string
    snippet: string
    section: string
    userId: string
    sectionsId: string
}
