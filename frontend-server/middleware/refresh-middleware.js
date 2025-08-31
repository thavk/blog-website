import axios from '../api/axios-instance.js';

export default async function refreshMiddleware(req, res, next) {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    };

    try {
        const response = await axios.post('/refresh', { token });
        const newToken = response.data.token;

        if (!newToken) {
            return res.status(401).json({ error: 'Invalid token' });
        };

        res.cookie('accessToken', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000 * 24 * 7 + 100000,
        });
        return next();
    } catch (error) {
        console.error('Refresh Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    };
};
