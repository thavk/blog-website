import pool from '../config/db.js';
import jwt from 'jsonwebtoken';

export async function blogsHandler(req, res) {

    try {
        const { token } = req.body;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        };

        let decoded;
        let validToken = token;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {

            if (error.name === 'TokenExpiredError') {
                decoded = jwt.decode(token);
                const currSession = await pool.query('SELECT * FROM session WHERE user_id = $1', [decoded.userId]);

                if (!currSession.rows[0]?.valid) {
                    return res.status(401).json({ error: 'Refresh token expired' });
                };

                validToken = jwt.sign(
                    { userId: decoded.userId },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRES_IN},
                );
            } else {
                return res.status(401).json({ error: 'Unauthorized' });
            };
        };

        //FOR FUTURE ME -> UPDATE WHAT YOU ARE SELECTING FROM BLOGS, DON'T SENT FULL TABLE!!!!
        const result = await pool.query('SELECT * FROM blogs');

        return res.json({
            blogList: result.rows,
            token: validToken,
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    };
};



