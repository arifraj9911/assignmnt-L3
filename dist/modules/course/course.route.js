"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const express_1 = require("express");
const course_controller_1 = require("./course.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const course_validation_1 = require("./course.validation");
const router = (0, express_1.Router)();
router.post("/create", (0, validateRequest_1.default)(course_validation_1.CourseValidationSchema.createCourseSchema), course_controller_1.CourseController.createCourse);
router.get("/", course_controller_1.CourseController.getAllCourse);
exports.CourseRoutes = router;
