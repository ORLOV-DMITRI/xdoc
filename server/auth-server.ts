'use server'

import {SignUpType} from "@/types/types";
import db from "../prisma/db";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import {cookies} from "next/headers";


export async function RegisterUser({email, password}: SignUpType) {

    if (!email || !password) {
        throw new Error("Email и пароль обязательны");
    }

    const registeredUser = await db.user.findUnique({where: {email}});
    if (registeredUser) {
        throw new Error("Пользователь с таким email уже существует");
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

    return {
        id: newUser.id,
        email: newUser.email,
        token,
    };
}

export async function LogInUser({email, password}: SignUpType) {
    if (!email || !password) {
        throw new Error("Email и пароль обязательны");
    }

    const user = await db.user.findFirst({
        where: {
            email
        }
    });
    const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));
    const secret = process.env.JWT_SECRET;

    if (user && isPasswordCorrect && secret) {
        return {
            id: user.id,
            email: user.email,
            token: jwt.sign({id: user.id}, secret, {expiresIn: "30d"})
        }
    } else {
        throw new Error("Ошилбка Логина или Пароля");
    }
}


export async function CurrentUser() {

    const token = cookies().get('token')?.value;
    if (!token) {
        return false;
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
        return user;
    }else {
        throw new Error("Такой пользователь не найдет");

    }

}
