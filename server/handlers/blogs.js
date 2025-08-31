import pool from '../config/db.js';

export async function blogsHandler(req, res) {
        const token = req.token;
    try {
        const result = await pool.query('SELECT * FROM blogs');

        return res.json({
            blogList: result.rows,
            token: token,
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    };
};



