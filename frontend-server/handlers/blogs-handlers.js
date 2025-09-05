import axios from '../api/axios-instance.js';

function setNewCookie(res, token) {
    res.cookie('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000 * 24 * 7 + 100000,
    });
};


export async function getBlogsHandler(req, res) {
    const token = req.cookies?.accessToken;
    if (!token) {
        return res.status(401).json({ error: 'Invalid token' });
    };

    try {
        const response = await axios.get('/blogs/blogs-list', { params: { token: token } });

        setNewCookie(res, response.data.token);
        return res.json(response.data.blogList);
    } catch (error) {
        if (error.response?.data?.error === 'Invalid token') {
            return res.status(401).json({ error: 'Invalid token' });
        };
        return res.status(500).json({ error: 'Internal Server Error' });
    };
};

export async function submitBlogHandler(req, res) {
    const token = req.cookies?.accessToken;
    if (!token) {
        return res.status(401).json({ error: 'Invalid token' });
    };

    try {
        const blog = req.body.blog;
        const response = await axios.post('/blogs/blog-submit', { blog: blog }, { params: { token: token } });

        setNewCookie(res, response.data.token);
        return res.json({message: 'Blog submitted successfully'});
    } catch (error) {
        if (error.response?.data?.error === 'Invalid token') {
            return res.status(401).json({ error: 'Invalid token' });
        };
        return res.status(500).json({ error: 'Internal Server Error' });
    };
};
