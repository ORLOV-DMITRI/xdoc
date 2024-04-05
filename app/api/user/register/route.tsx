import db from "../../../../prisma/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
    const {email, password} = await request.json()


    if (!email || !password) {

        return Response.json({message: 'Email и пароль обязательны'}, {status: 400})
    }

    const registeredUser = await db.user.findUnique({where: {email}});

    if (registeredUser) {
        return Response.json({message: 'Пользователь с таким email уже существует'}, {status: 400})
    }

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await db.user.create({
        data: {
            email,
            password: hashPassword,
        },
    });
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({id: newUser.id}, secret, {expiresIn: "30d"});


    return Response.json({id: newUser.id, email: newUser.email, token,}, {status: 201})

}
