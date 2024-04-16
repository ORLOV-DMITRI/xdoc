import db from "../../../prisma/db";

export async function POST(request: Request) {
    try {
        const {title, snippet, subtitle, section, id} = await request.json();


        if (!title || !subtitle || !section) {
            throw new Error('Заполните обязательные поля')
        }


        const allSections = await db.sections.findMany();
        const currentSection = allSections.find(item => item.name.toLowerCase() === section.toLowerCase());

        if (!currentSection) {
            throw new Error('Раздел не найден');
        }



        const newRecord = await db.record.create({
            data: {
                title: title,
                subtitle: subtitle,
                snippet: snippet,
                section: { connect: { id: currentSection.id } }, // Используйте connect для связи с разделом
                User: { connect: { id: id } }
            }
        });

        return Response.json({status: 200})


    } catch (error) {
        console.error('Произошла ошибка:', error);
        // @ts-ignore
        return Response.json({ message: error.message || 'Возникла ошибка' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const sections = await db.sections.findMany({
            include: {
                records: true
            }
        });

        return Response.json({sections},{status: 200})
    }catch (error) {
        console.error('Произошла ошибка:', error);
        // @ts-ignore
        return Response.json({ message: error.message || 'Возникла ошибка' }, { status: 500 });
    }
}
