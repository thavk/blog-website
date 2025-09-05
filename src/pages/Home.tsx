import React, { useEffect, useState } from 'react';
import { BlogCard } from '../features/BlogDisplay';
import { getBlogsList } from '../components/blogs-handlers.js';
import { Blog } from '../api/auth/blogs';
import { useNavigate } from 'react-router-dom';

export const HomeComponent = () => {
    const [blogsList, setBlogsList] = useState<Array<Blog>>([]);
    const navigate = useNavigate();


    const blogs = async (): Promise< Blog | undefined> => {
        try {
            const response = await getBlogsList();
            setBlogsList(response.data);
            return;
        } catch (error: any) {
            if (error.response?.data?.error === 'Invalid token') {
                navigate('/login');
            };
            return;
        };
    };
    useEffect(() => {
        blogs();
    }, []);

    useEffect(() => {
        console.log(blogsList);
    }, [blogsList]);

    return (
        <div style={{
            width: 'min(1200px, 90vw)',
            alignItems: 'center',
            gap: 16,
            display: 'flex',
            flexDirection: 'column',
        }}>
            {blogsList.map((blog, index) => (
                <div key={index}>
                    <BlogCard blog={blog}  />
                </div>
            ))}
        </div>
    );
};
