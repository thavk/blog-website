import express from 'express';
import pool from './config/db.js';

const app = express();

app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ time: result.rows[0].now });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
