import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(30).trim(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["admin", "user"] as [string, ...string[]]),
  }),
});

const loginUserValidation = z.object({
  body: z.object({
    username: z.string({ required_error: "username needed for login" }),
    password: z.string({ required_error: "password needed for login" }),
  }),
});

const changePasswordValidation = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: "Old Password required!" }),
    newPassword: z.string({ required_error: "New Password required!" }),
  }),
});

export const UserValidationZodSchema = {
  userValidationSchema,
  loginUserValidation,
  changePasswordValidation,
};
