import React, { createContext, useState, useEffect } from "react";
import { api } from "../services/apiClient";
import { setCookie } from "nookies";
import Loading from "../components/loading/index";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [IsAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    async function Login(value) {
        try {
            const response = await api.post('/auth',{
                    pass:value
            });
            
            const token = response.data.token;
            setCookie(undefined, '@Portfolio.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/",
            });
            api.defaults.headers['Authorization'] = `Bearer ${token}`;
            window.location.href = "/portfolio";
        } catch (err) {
            toast.warning(err.response.data.error);
        }
    }

    useEffect(() => {
        async function checkLogin() {
            try {
                const res = await api.get('/login');
                setIsAuthenticated(true);
            } catch (err) {
                setIsAuthenticated(false);
            }finally{
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    if (loading){
        return (
            <Loading/>
        )
    }
    
    return (
        <AuthContext.Provider value={{ Login, IsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}
