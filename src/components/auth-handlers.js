import axiosInstance from '../api/axiosInstance.js';

export async function login(email, password) {

    try {
        const response = await axiosInstance.post('/auth/login', { email, password });

        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        const err = {isError: true, error: error.response?.data?.error || 'Something went wrong'};

        return err;
    };

};

export async function register(email, username, password) {

    try {
        const response = await axiosInstance.post('/auth/register', { email, username, password });

        return response.data;
    } catch (error) {
        const err = {isError: true, error: error.response?.data?.error || 'Something went wrong'};

        return err;
    };
};
