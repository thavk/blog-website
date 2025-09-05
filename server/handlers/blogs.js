import pool from '../config/db.js';

export async function blogsHandler(req, res) {
    const token = req.token;
    try {
        /*const result = await pool.query('SELECT * FROM blogs');

        return res.json({
            blogList: result.rows,
            token: token,
        });*/

        const blogList = [
            { id: 1, title: 'Sample Blog 1', content: 'Lorem ipsum...' },
            { id: 2, title: 'Sample Blog 2', content: 'Lorem ipsum...' },
        ];
        return res.json({
            blogList,
            token: token,
        });
    } catch (error) {
        if (error.response?.data?.error === 'Invalid token') {
            return res.status(401).json({ error: 'Invalid token' });
        };
        console.error('Blogs Handler Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    };
};

export async function submitBlogHandler(req, res) {
    const { token, userId } = req;
    try {
        const blog = req.body.blog;
        const result = await pool.query('INSERT INTO blogs (user_id, title, content) VALUES ($1, $2, $3) RETURNING *',
            [userId, blog.title, blog.content]);

        return res.json({
            token: token,
            userId: userId,
        });
    } catch (error) {
        if (error.response?.data?.error === 'Invalid token') {
            return res.status(401).json({ error: 'Invalid token' });
        };
        console.error('Blogs Handler Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    };
};

