import React, { useState } from 'react';
import { PageContainer } from '../features/wrappers/PageContainer';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { MultiButton } from '../features/MultiButton';
import { submitBlog } from '../components/blogs-handlers.js';

export const BlogComponent = () => {
    const [quillValue, setQuillValue] = useState<string>('');

    const submitHandler = async (val: string) => {
        try {
            await submitBlog(val);
            return;
        } catch (error) {
            console.log(error);
        };
        return;
    };

    return (
        <PageContainer sx={{ textAlign: 'center' }}>
            <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
                <div className="text-editor">
                    <ReactQuill
                        placeholder="Write your blog here..."
                        theme="snow"
                        value={quillValue}
                        onChange={(value) => setQuillValue(value)}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 16, flexDirection: 'row' }}>
                    <div style={{ position: 'absolute', right: 10 }}>
                        <MultiButton content="Cancel" onClick={() => setQuillValue('')} />
                    </div>
                    <div style={{ position: 'absolute', right: 100 }}>
                        <MultiButton content="Submit" onClick={() => submitHandler(quillValue)} />
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};
