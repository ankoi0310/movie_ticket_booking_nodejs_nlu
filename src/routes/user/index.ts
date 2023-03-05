import express from 'express';
import profile from './profile';

const router = express.Router();

router.get('/profile', profile);

export default router;