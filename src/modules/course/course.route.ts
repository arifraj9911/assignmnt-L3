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

export const CourseRoutes = router;
