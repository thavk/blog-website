import pool from '../config/db.js';
import jwt from 'jsonwebtoken';

export async function blogsHandler(req, res) {

    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        };

        try {
            jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({ error: 'Unauthorized' });
        };

        const result = await pool.query('SELECT * FROM blogs');

        return res.json(result.rows);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    };
};



