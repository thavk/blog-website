import axios from '../api/axios-instance.js';

export async function loginHandler(req, res) {
    const { loginInput, password } = req.body;

    if (!loginInput || !password) {
        return res.status(400).json({ error: 'Missing username/email or password' });
    };


    try {
        const response = await axios.post('/auth/login', { loginInput, password });
        const token = response.data.token;

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
    const { email, username, password } = req.body;

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
