import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { ReviewZodValidationSchema } from "./review.validation";
import { ReviewController } from "./review.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
  "/create",
  auth(USER_ROLE.user),
  validateRequest(ReviewZodValidationSchema.createReviewSchema),
  ReviewController.createReview
);
router.get("/", ReviewController.getAllReview);

export const ReviewRoutes = router;
