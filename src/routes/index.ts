import { Router } from "express";
import { CourseRoutes } from "../modules/course/course.route";

const router = Router();

const routerModule = [{ path: "/course", route: CourseRoutes }];

routerModule.forEach((route) => router.use(route.path, route.route));

export default router;
