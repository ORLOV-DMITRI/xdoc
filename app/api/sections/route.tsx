import db from "../../../prisma/db";
import {SectionType} from "@/types/types";

export async function GET() {
    const sections = await db.sections.findMany();
    return Response.json(sections, {status: 200})

}

export async function POST(request: Request) {
    try {
        const {section} = await request.json()

        const allSections: SectionType[] = await db.sections.findMany();

        const sectionsName = allSections.map(item => item.name.toLowerCase());

        if (sectionsName.includes(section.toLowerCase())) {
            throw new Error('Такой раздел уже есть')
            // return Response.json({message: 'Такой раздел уже есть'}, {status: 400})
        }


        await db.sections.create({
            data: {
                name: section,
            }
        })

        return Response.json({status: 200})


    } catch (error) {
        return Response.json({message: error}, {status: 500})
    }
}
