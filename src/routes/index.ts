import { Router } from "express";
import { CourseRoutes } from "../modules/course/course.route";
import { CategoryRoutes } from "../modules/category/category.route";
import { ReviewRoutes } from "../modules/review/review.route";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();

const routerModule = [
  { path: "/course", route: CourseRoutes },
  { path: "/category", route: CategoryRoutes },
  { path: "/reviews", route: ReviewRoutes },
  { path: "/user", route: UserRoutes },
];

routerModule.forEach((route) => router.use(route.path, route.route));

export default router;
