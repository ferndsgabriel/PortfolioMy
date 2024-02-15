import React, { createContext, useState, useEffect } from "react";
import { api } from "../services/apiClient";
import { setCookie, destroyCookie } from "nookies";
import Loading from "../components/loading/index";
import { toast } from "react-toastify";


export const AuthContext = createContext();
export function singOut(){
    try{
        destroyCookie(undefined, "@Portfolio.token");
        window.location.href = '/'
    }catch{
        console.log('Error while logging out')
    }
}
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
            window.location.href = '/portfolio';
        } catch (err) {
            toast.warning(err.response.data.error);
            singOut();
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
