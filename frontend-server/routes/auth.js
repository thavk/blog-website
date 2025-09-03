import express from 'express';
import { logoutHandler, registerHandler, loginHandler } from '../handlers/auth-handlers.js';

const router = express.Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/logout', logoutHandler);

export default router;
