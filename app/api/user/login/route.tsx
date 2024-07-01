import db from "../../../../prisma/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
    const {email, password} = await request.json()

    try {
        if (!email || !password) {

            return Response.json({message: 'Email и пароль обязательны'}, {status: 400})
        }

        const user = await db.user.findFirst({
            where: {
                email
            }
        });
        const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));
        const secret = process.env.JWT_SECRET;

        if (user && isPasswordCorrect && secret) {
            return Response.json({
                id: user.id,
                email: user.email,
                token: jwt.sign({id: user.id}, secret, {expiresIn: "30d"})
            }, {status: 201})

        } else {
            return Response.json({message: 'Ошилбка Логина или Пароля'}, {status: 400})
        }
    } catch (error) {
        return Response.json({ message: 'Неверный токен', status: 400 }, { status: 400 });
    }


}
