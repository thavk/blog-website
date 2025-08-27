import jwt from 'jsonwebtoken';
import axios from '../api/axios-instance.js';

function generateToken(userId) {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN},
    );
};

export async function loginHandler(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Missing username or password' });
    };


    try {
        const response = await axios.post('/auth/login', { email, password });

        const token = generateToken(response.user_id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000,
        });

        return res.json({ message: 'Login Successful' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    };
};


export async function registerHandler(req, res) {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        return res.status(400).json({ error: 'Missing username or password' });
    };

    try {
        await axios.post('/auth/register', { email, password, username });

        return res.json({ message: 'Register Successful' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    };
};
