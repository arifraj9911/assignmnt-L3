import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { CategoryValidationSchema } from "./category.validation";
import { CategoryController } from "./category.controller";

const router = Router();

router.post(
  "/create",
  validateRequest(CategoryValidationSchema.createCategoryValidationSchema),
  CategoryController.createCategory
);
router.get("/", CategoryController.getAllCategory);

export const CategoryRoutes = router;
