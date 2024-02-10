import axios from "axios";
import { parseCookies } from "nookies";

export const baseUrl = 'https://portfbackend.vercel.app';

export const SetupApi = (ctx = undefined) => {
    let cookies = parseCookies(ctx);
    const api = axios.create({
        baseURL: baseUrl,
        headers: {
            Authorization: `Bearer ${cookies['@Portfolio.token']}`,
        }
    });

    api.interceptors.response.use(
        response => {
            return response;
        },
        (error) => { // Renomeado para 'error'
            if (error.response && error.response.status === 401) { 
                if (typeof window !== 'undefined') {
                }
            } else {
                return Promise.reject(error);
            }
            return Promise.reject(error);
        }
    );
    return api;
}
