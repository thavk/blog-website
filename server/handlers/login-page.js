import pool from '../config/db-pool.js';

async function loginHandler(req, res) {
    const { username, email, password } = req.body;

    if ((!username && !email) || !password) {
        return res.status(400).json({ error: 'Missing username or password' });
    };

    try {
        let result;

        if (username) {
            result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        } else if (email) {
            result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        };

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        };

        const user = result.rows[0];

        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        };

        return res.json({ message: 'Login Successful', userId: user.user_id, username: user.username });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    };
};

export default loginHandler;
