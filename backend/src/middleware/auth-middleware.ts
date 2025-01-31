import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

declare global {
	namespace Express {
			interface Request {
					user?: jwt.JwtPayload;
			}
	}
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
		return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid access token' });
      }
      
      req.user = decoded as jwt.JwtPayload;
      next();
    }
  );
};

export default verifyJWT;