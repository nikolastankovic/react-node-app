import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../types/user';


const generateAccessToken = (user: IUser) => {
	return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "2m" });
};

const generateRefreshToken = (user: IUser) => {
	return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "5d" });
};

const verifyToken = (token: string, secret: string): Promise<JwtPayload> => 
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return reject(err);
      if (!decoded || typeof decoded === 'string') {
        return reject(new Error('Invalid token payload'));
      }
      resolve(decoded as JwtPayload);
    });
  });

export  {
	generateAccessToken,
	generateRefreshToken,
	verifyToken
};