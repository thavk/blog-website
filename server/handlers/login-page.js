import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

function generateToken(userId) {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN},
    );
};
export async function loginHandler(req, res) {
    const { loginInput, password } = req.body;

    if (!loginInput || !password) {
        return res.status(400).json({ error: 'Missing username or password' });
    };

    try {
        let result;
        if (loginInput.includes('@')) {
            const email = loginInput;
            result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        } else {
            const username = loginInput;
            result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        };


        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        };

        const user = result.rows[0];

        const token = generateToken(user.user_id);

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        };


        return res.json({ message: 'Login Successful', token: token });
    } catch (error) {
        console.error('Login Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    };
};



export async function registerHandler(req, res) {
    const { email, password, username } = req.body;
    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const usernamePattern = /^[a-zA-Z0-9_]{5,30}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,60}$/;

    if (!email || !password || !username) return res.status(400).json({ error: 'Missing username or password' });
        else if (!emailPattern.test(email) || email.length > 254) return res.status(400).json({ error: 'Invalid email' });
            else if (!usernamePattern.test(username)) return res.status(400).json({ error: 'Invalid username' });
                else if (!passwordPattern.test(password)) return res.status(400).json({ error: 'Invalid password' });

    try {
        const resp = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (resp.rows.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (email, password, username)
             VALUES ($1, $2, $3)
             RETURNING user_id, username`,
            [email, hashedPassword, username]
        );

        return res.json({ message: 'Register Successful', userId: result.rows[0].user_id, username: result.rows[0].username });
    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    };
};






