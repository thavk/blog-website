import express from 'express';
import { registerHandler, loginHandler, logoutHandler } from '../handlers/login-page.js';

const router = express.Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/logout', logoutHandler);

export default router;
