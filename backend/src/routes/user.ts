import express from 'express';
const router = express.Router();

import { getUserData } from '../controllers/user';
import verifyJWT from '../middleware/auth-middleware';

router.route('/')
    .get(verifyJWT, getUserData);

export default router;