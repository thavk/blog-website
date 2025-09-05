import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import crypto from 'crypto';


export default async function refreshMiddleware(req, res, next) {
    const token = req.query?.token || req.body?.token;

    if (!token) return res.status(401).json({ error: 'Invalid token' });
    try {
        let decoded;
        let validToken = token;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                decoded = jwt.decode(token);
                const currSession = await pool.query('SELECT * FROM session WHERE refresh_secret = $1', [decoded.secret]);
                if (currSession.rows[0]?.expires_at <= new Date()) {
                    await pool.query('UPDATE session SET valid = false WHERE refresh_secret = $1', [decoded.secret]);

                    return res.status(401).json({ error: 'Invalid token' });
                };
                if (!currSession.rows[0]?.valid || currSession.rows[0]?.refresh_secret !== decoded.secret) {
                    if (!currSession.rows[0]) {
                        return res.status(401).json({ error: 'Duplicate Request' });
                    };

                    return res.status(401).json({ error: 'Invalid token' });
                };

                const newSecret = crypto.randomBytes(64).toString('hex');
                await pool.query('UPDATE session SET refresh_secret = $1 WHERE refresh_secret = $2', [newSecret, decoded.secret]);

                validToken = jwt.sign(
                    { userId: decoded.userId, secret: newSecret },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRES_IN},
                );

            } else {
                return res.status(401).json({ error: 'Invalid token' });
            };
        };
        req.token = validToken;
        req.userId = decoded.userId;
        next();

    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    };
};
