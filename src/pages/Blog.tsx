import React, { useState } from 'react';
import { PageContainer } from '../features/wrappers/PageContainer';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { MultiButton } from '../features/MultiButton';
import { submitBlog } from '../components/blogs-handlers.js';
import styles from '../styles/Blog.module.scss';

export const BlogComponent = () => {
    const [quillValue, setQuillValue] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const submitHandler = async (title: string, content: string) => {
        try {
            await submitBlog(title, content);
            return;
        } catch (error) {
            console.log(error);
        };
        return;
    };

    return (
        <PageContainer sx={{ textAlign: 'center' }}>
            <div className={styles.container}>
                <form>
                    <input
                        type="text"
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles.titleInput}
                    />
                </form>
                <div className={styles.editorContainer}>
                    <ReactQuill
                        placeholder="Write your blog here..."
                        theme="snow"
                        value={quillValue}
                        onChange={(value) => setQuillValue(value)}
                    />
                </div>
                <div className={styles.buttons}>
                    <div style={{ }}>
                        <MultiButton content="Cancel" onClick={() => setQuillValue('')} />
                    </div>
                    <div style={{}}>
                        <MultiButton content="Submit" onClick={() => submitHandler(title, quillValue)} />
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};
