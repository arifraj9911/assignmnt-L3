"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (error, req, res, next) => {
    const message = error.message || "Something went wrong";
    const statusCode = 500;
    res.status(statusCode).json({
        success: false,
        message,
        error,
    });
};
exports.default = globalErrorHandler;
