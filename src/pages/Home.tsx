import React, { useEffect } from 'react';
import { BlogCard } from '../features/blog-display';
import { getBlogsList } from '../components/blogs-list.js';


export const HomeComponent = () => {
    useEffect(() => {
        getBlogsList();
    }, []);

    return (
        <div style={{
            width: 'min(1200px, 90vw)',
            alignItems: 'center',
            gap: 16,
            display: 'flex',
            flexDirection: 'column',
        }}>
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
        </div>
    );
};
