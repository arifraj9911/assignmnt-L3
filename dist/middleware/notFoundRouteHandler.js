"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFoundRouteHandler = (error, req, res, next) => {
    const message = "API Not Found";
    const statusCode = 404;
    res.status(statusCode).json({
        success: false,
        message,
        error,
    });
};
exports.default = notFoundRouteHandler;
