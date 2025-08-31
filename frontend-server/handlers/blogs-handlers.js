import axios from '../api/axios-instance.js';

export async function getBlogsHandler(req, res) {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    };

    try {
        const response = await axios.get('/blogs/blogs-list', { params: { token: token } });


        res.cookie('accessToken', response.data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000 * 24 * 7 + 100000,
        });

        return res.json(response.data.blogList);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    };
};
