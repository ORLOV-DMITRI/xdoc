import db from "../../../prisma/db";

export async function POST(request: Request) {
    try {
        const { query } = await request.json();


        if (!query) {
            throw new Error('Заполните обязательные поля')
        }

        const records = await db.record.findMany({
            where: {
                OR: [
                    { title: { contains: query } },
                    { subtitle: { contains: query } },
                    { snippet: { contains: query } },
                ],
            },
        });



        return Response.json({records})

    } catch (error) {
        console.error('Произошла ошибка:', error);
        // @ts-ignore
        return Response.json({ message: error.message || 'Возникла ошибка' }, { status: 500 });
    }
}
