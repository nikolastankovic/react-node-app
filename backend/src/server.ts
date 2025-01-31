import express from 'express';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import tokenRoutes from "./routes/token";
import connectDatabase from './utils/db';

dotenv.config();

const app = express();
connectDatabase();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/token', tokenRoutes);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
	console.error(err.stack);
	res.status(500).json({ message: 'Erorr occured' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
