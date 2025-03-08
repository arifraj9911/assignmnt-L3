"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_route_1 = require("../modules/course/course.route");
const router = (0, express_1.Router)();
const routerModule = [{ path: "/course", route: course_route_1.CourseRoutes }];
routerModule.forEach((route) => router.use(route.path, route.route));
exports.default = router;
