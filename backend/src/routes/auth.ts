import express from 'express';
import { register, login, logout } from '../controllers/auth';
const router = express.Router();
import { validate } from '../middleware/zod-middleware';
import { registerSchema } from '../schemas/register';
import { loginSchema } from '../schemas/login';

router.route('/register').post(validate(registerSchema), register);
router.route('/login').post(validate(loginSchema), login);
router.route('/logout').post(logout);

export default router;