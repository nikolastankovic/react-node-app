import type { NextFunction, Request, Response } from "express";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../utils/jwt";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import { refreshTokenExpiration } from "../constants";


const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(403).json({ message: "Refresh token missing" });
    }

    const decoded = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
    if (!decoded?.id) {
      return res.status(403).json({ message: "Invalid token payload" });
    }

    const foundUser = await User.findById(decoded.id).select('+refreshToken');
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (foundUser.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const accessToken = generateAccessToken(foundUser);
    const newRefreshToken = generateRefreshToken(foundUser);

    const updatedUser = await User.findByIdAndUpdate(
      foundUser._id,
      { refreshToken: newRefreshToken },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(500).json({ message: "Failed to update refresh token" });
    }

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: refreshTokenExpiration
    });

    return res.json({ accessToken });

  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(403).json({ message: "Refresh token expired" });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    next(error);
  }
};

export { refreshToken };