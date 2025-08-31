import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

export async function refreshMiddleware(req, res, next) {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(401).json({ error: 'Invalid token' });
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
                    return res.status(401).json({ error: 'Invalid token' });
                };

                validToken = jwt.sign(
                    { userId: decoded.userId },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRES_IN},
                );
            } else {
                return res.status(401).json({ error: 'Invalid token' });
            };
        };
        req.userId = decoded.userId;
        req.token = validToken;
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    };
};
