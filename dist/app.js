"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./middleware/globalErrorHandler"));
const notFoundRouteHandler_1 = __importDefault(require("./middleware/notFoundRouteHandler"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// application router middleware
app.use("/api/v1", routes_1.default);
// global error handler middleware
app.use(globalErrorHandler_1.default);
// not found handler
app.use(notFoundRouteHandler_1.default);
exports.default = app;
