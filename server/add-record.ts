'use server'

import {RecordType, SignUpType} from "@/types/types";
import db from "../prisma/db";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import {cookies} from "next/headers";


export async function AddRecord(data: RecordType) {

    const result = await db.record.create({
        data: {
            title: data.title,
            snippets: {
                create: data.snippets.map(snippet => ({
                    title: snippet.title,
                    snippet: snippet.snippet,
                    description: snippet.description,
                    language: {
                        create: { name: snippet.language } // предполагаем, что language - это название языка
                    }
                }))
            },
            subtitle: data.subtitle,
            tags: {
                create: data.tags.map(tagName => ({
                    name: tagName
                }))
            },
            section: data.section

        }
    });
}
