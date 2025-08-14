import express from 'express';
import authRoutes from './routes/auth.js';
import cors from 'cors';

const app = express();


app.use(express.json());

app.use(cors());

app.use('/auth', authRoutes);

app.listen(5000, '0.0.0.0', () => {
  console.log('Server running on http://localhost:5000');
});
