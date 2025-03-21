/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req, res, next) => {
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const login = catchAsync(async (req, res, next) => {
  const result = await UserServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User login successfully",
    data: result,
  });
});

const changePassword = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new Error("Token not given!!!");
  }

  const result = await UserServices.changePassword(token as string, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
  login,
  changePassword,
};
