import { Router } from "express";
import { CourseRoutes } from "../modules/course/course.route";
import { CategoryRoutes } from "../modules/category/category.route";

const router = Router();

const routerModule = [
  { path: "/course", route: CourseRoutes },
  { path: "/category", route: CategoryRoutes },
];

routerModule.forEach((route) => router.use(route.path, route.route));

export default router;
