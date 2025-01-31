import express from 'express';
const router = express.Router();
import { refreshToken } from "../controllers/token";

router.route('/refresh').get(refreshToken);

export default router;