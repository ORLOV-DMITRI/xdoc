import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import db from "../../../../prisma/db";

export async function GET() {

    try {
        const token = cookies().get('token')?.value;


        if (!token) {
            return Response.json({ message: 'Не авторизован', status: 400 }, { status: 400 })

        }
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT_SECRET is not defined");
        }

        interface JwtPayload {
            id: string;
        }

        const decoded = jwt.verify(token, secret) as JwtPayload;

        const user = await db.user.findUnique({
            where: {
                id: decoded.id
            }
        })
        if (user) {
            return Response.json({ user, status: 200 }, { status: 200 })
        } else {
            return Response.json({ message: 'Такой пользователь не найден' }, { status: 400 })
        }
    } catch (error) {
        console.error('JWT Error:', error);
        return Response.json({ message: 'Неверный токен', status: 400 }, { status: 400 });
    }

}
