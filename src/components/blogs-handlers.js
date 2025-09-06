import axiosInstance from '../api/axiosInstance.js';

export async function getBlogsList() {
    const response = await axiosInstance.get('api/blogs/blogs-list', { withCredentials: true });
    return response;
};

export async function submitBlog(blogTitle, blogContent) {
    const response = await axiosInstance.post('api/blogs/blog-submit', { blogTitle: blogTitle, blogContent: blogContent }, { withCredentials: true });
    return response;
};
