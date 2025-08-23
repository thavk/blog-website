import * as React from 'react';
import { BlogCard } from '../features/blog-display';



export const HomeComponent = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
        }}>
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
        </div>
    );
};
