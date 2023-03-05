import express from 'express';
import register from '../auth/register';
import login from '../auth/login';
import logout from '../auth/logout';
import token from '../auth/token';
import credential from '../auth/credential';

const router = express.Router();

router.use('/register', register);
router.use('/login', login);
router.use('/logout', logout);
router.use('/token', token);
router.use('/credential', credential);

export default router;