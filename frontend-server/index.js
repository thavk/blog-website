import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import authRoutes from './routes/auth.js';

const app = express();

// ACTIVATE ON PRODUCTION
/*const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.use(express.static(path.join(__dirname, '../build')));
*/

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use('/api', authRoutes);


app.listen(4000, '0.0.0.0', () => {
  console.log('Server running on http://localhost:4000');
});



