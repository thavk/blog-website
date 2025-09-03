import axiosInstance from '../api/axiosInstance.js';

export async function login(loginInput, password) {

    try {
        const response = await axiosInstance.post(
            '/api/auth/login',
            { loginInput, password },
            { withCredentials: true }
        );

        return response.data;
    } catch (error) {
        const err = {isError: true, error: error.response?.data?.error || 'Something went wrong'};

        return err;
    };

};

export async function register(username, email, password) {

    try {
        const response = await axiosInstance.post(
            '/api/auth/register',
            { email, username, password },
            { withCredentials: true }
        );

        return response.data;
    } catch (error) {
        const err = {isError: true, error: error.response?.data?.error || 'Something went wrong'};

        return err;
    };
};

export async function logout() {
    try {
        const response = await axiosInstance.post(
            '/api/auth/logout',
            { withCredentials: true }
        );

        return response.data;
    } catch (error) {
        const err = {isError: true, error: error.response?.data?.error || 'Something went wrong'};

        return err;
    };
};
