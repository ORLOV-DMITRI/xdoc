'use client'
import {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token')

        if (!token) {
            router.push('/auth'); // Перенаправляем на страницу входа, если токен не найден
        } else {
            setIsAuthenticated(true); // Устанавливаем, что пользователь аутентифицирован
        }
    }, []);

    return isAuthenticated;
};