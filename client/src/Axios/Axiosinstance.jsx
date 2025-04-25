import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    
});


axiosInstance.interceptors.request.use((request) => {
    const token = localStorage.getItem("token")
    request.headers.Authorization = `Bearer ${token}`
    return request;
})