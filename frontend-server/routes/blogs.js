import express from 'express';
import { getBlogsHandler } from '../handlers/blogs-handlers.js';

const router = express.Router();

router.get('/blogs', getBlogsHandler);

export default router;
