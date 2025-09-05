import express from 'express';
import { getBlogsHandler, submitBlogHandler } from '../handlers/blogs-handlers.js';

const router = express.Router();

router.get('/blogs-list', getBlogsHandler);
router.post('/blog-submit', submitBlogHandler);

export default router;
