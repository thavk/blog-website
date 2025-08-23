import pool from '../config/db.js';

export async function blogsHandler(req, res) {
    const { userId } = req.user;

    try {
        const result = await pool.query(SELECT * FROM blogs WHERE user_id = $1, [userId]);
        return res.json(result.rows);
    } catch (error) {
        console.error('Blogs Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    };
};



