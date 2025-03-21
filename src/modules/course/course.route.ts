import { Router } from "express";
import { CourseController } from "./course.controller";
import validateRequest from "../../middleware/validateRequest";
import { CourseValidationSchema } from "./course.validation";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
  "/create",
  auth(USER_ROLE.admin),
  validateRequest(CourseValidationSchema.createCourseSchema),
  CourseController.createCourse
);
router.get("/", CourseController.getAllCourse);
router.get("/:courseId/reviews", CourseController.getCourseByIdWithReviews);
router.get("/best", CourseController.getBestCourseByAvgRating);

router.patch(
  "/update/:id",
  auth(USER_ROLE.admin),
  validateRequest(CourseValidationSchema.updateCourseSchema),
  CourseController.updateCourse
);

export const CourseRoutes = router;
