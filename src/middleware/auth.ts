import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import User from "../modules/user/user.model";

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error("You are not authorized!!!");
    }

    const decoded = jwt.verify(
      token,
      config.access_token_secret as string
    ) as JwtPayload;

    const { role, email } = decoded;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found!!");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new Error("You are not authorized!!!");
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
