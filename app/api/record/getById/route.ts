import db from "../../../../prisma/db";
import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get('id');
        if(!id) {
            return Response.json({ message: 'Возникла ошибка' }, { status: 500 });

        }
        const record = await db.record.findUnique({
           where: {
               id
           }
        });

        return Response.json({record},{status: 200})
    }catch (error) {
        console.error('Произошла ошибка:', error);
        // @ts-ignore
        return Response.json({ message: error.message || 'Возникла ошибка' }, { status: 500 });
    }
}
