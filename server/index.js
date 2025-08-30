import express from 'express';
import authRoutes from './routes/auth.js';
import blogRoutes from './routes/blog.js';
import cors from 'cors';
import 'dotenv/config';

const app = express();


app.use(express.json());

app.use(cors());

app.use('/auth', authRoutes);

app.use('/blogs', blogRoutes);

app.listen(5000, '0.0.0.0', () => {
  console.log('Server running on http://localhost:5000');
});
