'use server'
import db from "../prisma/db";
import {SectionType} from "@/types/types";


export async function AddSection(section: string) {
    try {
        const newSection = await db.sections.create({
            data: {
                name: section,
            }
        })
    } catch (error) {
        console.log(error)
    }
}

// @ts-ignore
export async function GetSections(): Promise<SectionType[]> {
    try {
        return await db.sections.findMany();

    } catch (error) {
        console.log(error)
    }
}

