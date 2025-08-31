import axiosInstance from '../api/axiosInstance.js';

export async function getBlogsList() {
    try {
        const response = await axiosInstance.get('/api/blogs/blogs-list', { withCredentials: true });

        return response.data;
    } catch (error) {
        const err = {isError: true, error: error.response?.data?.error || 'Something went wrong'};

        return err;
    };
};
