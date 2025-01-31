import type { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import { IUser } from "../types/user";

const getUserData = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	try {
		const user = req.user;

		if (!user) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		const foundUser: IUser | null = await User.findById(user.id).select('-password -refreshToken');

		if (!foundUser) {
			return res.status(404).json({ message: 'User not found' });
		}

		return res.json(foundUser);
	} catch (error) {
		next(error);
	}
};

export { getUserData };
