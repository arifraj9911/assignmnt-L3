import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { UserValidationZodSchema } from "./user.validation";
import { UserController } from "./user.controller";

const router = Router();

router.post(
  "/create",
  validateRequest(UserValidationZodSchema.userValidationSchema),
  UserController.createUser
);

router.post(
  "/login",
  validateRequest(UserValidationZodSchema.loginUserValidation),
  UserController.login
);

router.patch(
  "/change-password",
  validateRequest(UserValidationZodSchema.changePasswordValidation),
  UserController.changePassword
);
// router.get("/", CategoryController.getAllCategory);

export const UserRoutes = router;
