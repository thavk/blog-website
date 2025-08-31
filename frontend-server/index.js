import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import authRoutes from './routes/auth.js';
import blogsRoutes from './routes/blogs.js';
import cookieParser from 'cookie-parser';

const app = express();

// ACTIVATE ON PRODUCTION
/*const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.use(express.static(path.join(__dirname, '../build')));
*/
app.use(express.json());

app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use('/api/auth', authRoutes);

app.use('/api/blogs', blogsRoutes);

app.listen(4000, '0.0.0.0', () => {
  console.log('Server running on http://localhost:4000');
});



