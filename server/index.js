import express from 'express';
import authRoutes from './routes/auth.js';
import blogRoutes from './routes/blog.js';
import cors from 'cors';
import 'dotenv/config';
import refreshMiddleware from './middleware/refresh-middleware.js';

const app = express();


app.use(express.json());

app.use(cors({ origin: 'http://localhost:4000', credentials: true }));

app.use('/auth', authRoutes);

app.use('/blogs', refreshMiddleware, blogRoutes);

app.listen(5000, '0.0.0.0', () => {
  console.log('Server running on http://localhost:5000');
});
