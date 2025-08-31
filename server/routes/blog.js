import express from 'express';
import { blogsHandler } from '../handlers/blogs.js';

const router = express.Router();

router.get('/blogs-list', blogsHandler);

export default router;
