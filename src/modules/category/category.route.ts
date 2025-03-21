import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { CategoryValidationSchema } from "./category.validation";
import { CategoryController } from "./category.controller";
import { USER_ROLE } from "../user/user.constant";
import { auth } from "../../middleware/auth";

const router = Router();

router.post(
  "/create",
  auth(USER_ROLE.admin),
  validateRequest(CategoryValidationSchema.createCategoryValidationSchema),
  CategoryController.createCategory
);
router.get("/", CategoryController.getAllCategory);

export const CategoryRoutes = router;
