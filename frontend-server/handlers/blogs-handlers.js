import jwt from 'jsonwebtoken';
import axios from '../api/axios-instance.js';

export async function getBlogsHandler(req, res) {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    };

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedToken.userId;
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    };


    try {
        const response = await axios.get('/blogs', { params: { userId: req.userId } });

        return res.json(response.data);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    };
};
