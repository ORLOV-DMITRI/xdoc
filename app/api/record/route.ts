import db from "../../../prisma/db";
import {NextRequest} from "next/server";

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
export async function DELETE(request: NextRequest) {

    try {
        const id = request.nextUrl.searchParams.get('id');
        if(!id) {
            return Response.json({ message: 'Возникла ошибка' }, { status: 500 });
        }
        const section = await prisma?.sections.findFirst({
            where: {
                records: {
                    some: {
                        id: id
                    }
                }
            },
            include: {
                records: true
            }
        });
        if (!section) {
            return new Response(JSON.stringify({ message: 'Секция с такой записью не найдена' }), { status: 404 });
        }
        const deletedRecord = await prisma?.record.delete({
            where: {
                id
            }
        })
        if (!deletedRecord) {
            return new Response(JSON.stringify({ message: 'Ошибка при удалении записи' }), { status: 500 });
        }

        if (section.records.length === 1) {
            await prisma?.sections.delete({
                where: {
                    id: section.id
                }
            });
        }
        return Response.json({status: 200})
    }catch (error) {
        console.error('Произошла ошибка:', error);
        // @ts-ignore
        return Response.json({ message: error.message || 'Возникла ошибка' }, { status: 500 });
    }
}
export async function PUT(request: Request) {

    const data = await request.json();
    try {
        const section = await prisma?.sections.findFirst({
            where: {
                records: {
                    some: {
                        id: data.id
                    }
                }
            },
            include: {
                records: true
            }
        });
        if (!section) {
            return new Response(JSON.stringify({ message: 'Секция с такой записью не найдена' }), { status: 404 });
        }
        const transaction = await prisma?.$transaction([
           prisma?.record.update({
                where: { id: data.id },
                data: {
                    ...data
                }
            }),

        ]);
        if (section.records.length === 1) {
            await prisma?.sections.delete({
                where: {
                    id: section.id
                }
            });
        }
        return Response.json({status: 200})
    }catch (error) {
        console.error('Произошла ошибка:', error);
        // @ts-ignore
        return Response.json({ message: error.message || 'Возникла ошибка' }, { status: 500 });
    }
}
