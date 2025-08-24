import * as React from 'react';
import { BlogCard } from '../features/blog-display';



export const HomeComponent = () => {
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
