import axios from 'axios';
import {auth} from '../config/firebase';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
api.interceptors.request.use(async (config) => {
    const token = await auth.currentUser?.getIdToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const userApi = {
    fetchUserData: () => api.get('/users/fetch-user-data'),
    updateUserData: (data: any) => api.put('/users/update-user-data', data)
};

export const authApi = {
    register: (data: any) => api.post('/auth/register', data),
    login: (data: any) => api.post('/auth/login', data),
    logout: () => api.post('/auth/logout')
};