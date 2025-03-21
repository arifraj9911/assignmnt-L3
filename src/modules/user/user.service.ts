/* eslint-disable @typescript-eslint/no-unused-vars */
import config from "../../config";
import { TUser } from "./user.interface";
import User from "./user.model";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);

  return result;
};

const loginUser = async (payload: { username: string; password: string }) => {
  const { username, password } = payload;

  // check username exist on the db
  const isUserExist = await User.findOne({ username }).lean();

  if (!isUserExist) {
    throw new Error("User doest not exist!!!");
  }

  // check password
  const isPasswordMatch = await bcrypt.compare(password, isUserExist.password);

  if (!isPasswordMatch) {
    throw new Error("Password doest not match!!!");
  }

  const jwtPayload = {
    _id: isUserExist._id,
    role: isUserExist.role,
    email: isUserExist.email,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.access_token_secret as string,
    { expiresIn: "10d" }
  );

  const { password: _, ...userWithoutPassword } = isUserExist;

  return {
    user: userWithoutPassword,
    token: accessToken,
  };
};

const changePassword = async (
  token: string,
  payload: { oldPassword: string; newPassword: string }
) => {
  const { oldPassword, newPassword } = payload;

  const decoded = jwt.verify(
    token,
    config.access_token_secret as string
  ) as JwtPayload;

  if (!decoded) {
    throw new Error("Invalid Token!!!");
  }

  const { _id, role, email } = decoded;

  // check username exist on the db
  const isUserExist = await User.findById(_id).lean();

  if (!isUserExist) {
    throw new Error("User doest not exist!!!");
  }

  // check old password
  const isOldPasswordMatch = await bcrypt.compare(
    oldPassword,
    isUserExist.password
  );

  if (!isOldPasswordMatch) {
    throw new Error("Old Password doest not match!!!");
  }

  //   check new password match with previous

  if (oldPassword === newPassword) {
    throw new Error("New password should be unique from old password");
  }

  const hashNewPassword = await bcrypt.hash(
    newPassword,
    Number(config.salts_password)
  );

  const result = await User.findOneAndUpdate(
    { role, email },
    {
      password: hashNewPassword,
    },
    { new: true, select: "-password" }
  );

  return result;
};

export const UserServices = {
  createUserIntoDB,
  loginUser,
  changePassword,
};
