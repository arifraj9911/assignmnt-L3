/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const message = error.message || "Something went wrong";
  const statusCode = 500;

  res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};

export default globalErrorHandler;
