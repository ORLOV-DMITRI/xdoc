import {useEffect, useState} from "react";
import Cookies from "js-cookie";

export const hasUser = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token')

        if (!token) {
            setIsAuthenticated(false);
        } else {
            setIsAuthenticated(true);
        }
    }, []);

    return isAuthenticated;
};