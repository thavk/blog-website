import pool from '../config/db.js';

export async function loginHandler(req, res) {
    const { email, password } = req.body;

    console.log(req.body);


    if (!email || !password) {
        return res.status(400).json({ error: 'Missing username or password' });
    };

    try {

        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        };

        const user = result.rows[0];

        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        };

        console.log(res.json({ message: 'Login Successful', userId: user.user_id, username: user.username }));


        return res.json({ message: 'Login Successful', userId: user.user_id, username: user.username });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    };
};



export async function registerHandler(req, res) {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        return res.status(400).json({ error: 'Missing username or password' });
    };

    try {
        const resp = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (resp.rows.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        };

        //const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query('INSERT INTO users (email, password, username) VALUES ($1, $2, $3)', [email, password, username]);
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        console.log(res.json({ message: 'Register Successful', userId: result.rows[0].user_id, username: result.rows[0].username }));
        return res.json({ message: 'Register Successful', userId: result.rows[0].user_id, username: result.rows[0].username });
    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    };
};






