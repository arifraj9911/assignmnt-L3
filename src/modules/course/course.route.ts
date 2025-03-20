import { Router } from "express";
import { CourseController } from "./course.controller";
import validateRequest from "../../middleware/validateRequest";
import { CourseValidationSchema } from "./course.validation";

const router = Router();

router.post(
  "/create",
  validateRequest(CourseValidationSchema.createCourseSchema),
  CourseController.createCourse
);
router.get("/", CourseController.getAllCourse);
router.get("/:courseId/reviews", CourseController.getCourseByIdWithReviews);
router.get("/best", CourseController.getBestCourseByAvgRating);

router.patch(
  "/update/:id",
  validateRequest(CourseValidationSchema.updateCourseSchema),
  CourseController.updateCourse
);

export const CourseRoutes = router;
