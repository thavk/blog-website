import axiosInstance from '../api/axiosInstance.js';

export async function login(email, password) {
    const response = await axiosInstance.post('/auth/login', { email, password });
    console.log(response);
    return response.data;
};

export async function register(email, username, password) {
    const response = await axiosInstance.post('/auth/register', { email, username, password });
    console.log(response);
    return response.data;
};
