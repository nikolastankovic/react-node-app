import type {  Request, Response } from 'express';
import { User } from "../models/User";
import { generateAccessToken, generateRefreshToken, verifyToken } from '../utils/jwt';
import { IUser } from '../types/user';
import { refreshTokenExpiration } from '../constants';

const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = new User({
      email,
      password,
      firstName,
      lastName
    });

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    newUser.refreshToken = refreshToken;
    await newUser.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: refreshTokenExpiration
    });

    res.status(201).json({ 
      accessToken, 
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

		user.refreshToken = refreshToken;
		await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: refreshTokenExpiration
    });

    res.json({ 
      accessToken, 
      message: "User logged in successfully",
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req: Request, res: Response) => {
  try {

		const refreshToken = req.cookies.refreshToken;
		if (!refreshToken) {
			res.clearCookie("refreshToken");
			return res.status(204).end();;
		}

		const decoded = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
		if (!decoded) {
			res.clearCookie("refreshToken");
			return res.status(204).end();;
		}

		const user = decoded as IUser;

		const foundUser = await User.findById(user.id);
		if (!foundUser) {
			res.clearCookie("refreshToken");
			return res.status(204).end();;
		}

		foundUser.refreshToken = "";
		await foundUser.save();

    res.clearCookie("refreshToken");
	  res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { register, login, logout };