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
        if (error.response?.data?.error === 'Duplicate Request' || 'Invalid token') {
            return error;
        };
        return res.status(500).json({ error: 'Internal Server Error' });
    };
};



