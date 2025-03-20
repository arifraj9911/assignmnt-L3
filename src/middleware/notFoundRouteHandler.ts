/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

const notFoundRouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = "API Not Found";
  const statusCode = 404;

  res.status(statusCode).json({
    success: false,
    message,
    error: "",
  });

  return;
};

export default notFoundRouteHandler;
