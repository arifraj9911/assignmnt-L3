import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { ReviewZodValidationSchema } from "./review.validation";
import { ReviewController } from "./review.controller";

const router = Router();

router.post(
  "/create",
  validateRequest(ReviewZodValidationSchema.createReviewSchema),
  ReviewController.createReview
);
router.get("/", ReviewController.getAllReview);

export const ReviewRoutes = router;
