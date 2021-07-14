import Enterprise from '../auth/enterpriseAuth'
import api from '../config/axiosConfig'

const TOKEN_KEY = 'GROUPCON_TOKEN';

// Set the jwt to the browser
export function setToken(token:string): void {
    localStorage.setItem(TOKEN_KEY, token);
}

// Get the jwt from browser
export function getToken(): string | null{
    return localStorage.getItem(TOKEN_KEY);
}

// Delete the jwt from browser
export function deleteToken() {
    localStorage.removeItem(TOKEN_KEY);
    Enterprise.setInstance({});
}

// Initialices the header. This way, the Authorization must have a Bearer token
export function initAxiosInterceptors() {
    api.interceptors.request.use(config => {
        const token = getToken();

        if (token) 
            config.headers.Authorization = `Bearer ${token}`;

        return config;
    });

    api.interceptors.response.use(
        response => response,
        error => {
            if (error.response.status === 401) 
                deleteToken();
            else 
                return Promise.reject(error);
            
        }
    );
}