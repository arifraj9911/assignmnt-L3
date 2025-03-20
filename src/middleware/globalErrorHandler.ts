/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { TErrorSource } from "../interface/error";
import handleZodError from "../errors/handleZodError";
import config from "../config";
import handleCastError from "../errors/handleCastError";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let message = error.message || "Something went wrong";
  let statusCode = error.statusCode || StatusCodes.BAD_REQUEST;

  let errorDetails: TErrorSource = [
    {
      path: "",
      message,
    },
  ];

  if (error instanceof ZodError) {
    const simplifliedErrorResponse = handleZodError(error);

    statusCode = simplifliedErrorResponse.statusCode;
    message = simplifliedErrorResponse.message;
    errorDetails = simplifliedErrorResponse.errorDetails;
  } else if (error?.name === "CastError") {
    const simplifliedErrorResponse = handleCastError(error);

    statusCode = simplifliedErrorResponse.statusCode;
    message = simplifliedErrorResponse.message;
    errorDetails = simplifliedErrorResponse.errorDetails;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
    error,
    stack:
      config.node === "development" ? error?.stack || error : undefined,
  });

  return;
};

export default globalErrorHandler;
