import axiosInstance from '../api/axiosInstance.js';

export async function getBlogsList() {
    const response = await axiosInstance.get('api/blogs/blogs-list', { withCredentials: true });
    return response;

};
