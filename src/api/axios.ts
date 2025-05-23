import axios from "axios";
import config from "../config.ts";
import {useAuthToken} from "../hooks/use-auth-token.ts";


export interface ApiResponse<T> {
    status: number;
    message?: string;
    success: boolean;
    data: T | null;
    error?: {
        code: number;
        message: string;
    };
    meta?: Record<string, unknown>;
}


export const apiClient = axios.create({
    baseURL: `${config.api.apiUrl}/api/v1`,
    timeout: config.api.timeout,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    withCredentials: true
});


// ADDS THE AUTH TOKEN TO THE HEADERS
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            const {removeAuthToken} = useAuthToken()
            removeAuthToken()
        }
        console.error("API Error:", error);
        return Promise.reject(error);
    }
);
