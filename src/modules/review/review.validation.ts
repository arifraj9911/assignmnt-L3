import { z } from "zod";
import mongoose from "mongoose";

// Create Review Schema
const createReviewSchema = z.object({
  body: z.object({
    courseId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid courseId",
    }),
    rating: z
      .number()
      .min(0, { message: "Rating must be at least 0" })
      .max(5, { message: "Rating cannot exceed 5" }),
    review: z.string().min(1, { message: "Review cannot be empty" }),
  }),
});

// Update Review Schema
const updateReviewSchema = z.object({
  body: z
    .object({
      courseId: z
        .string()
        .optional()
        .refine((val) => !val || mongoose.Types.ObjectId.isValid(val), {
          message: "Invalid courseId",
        }),
      rating: z.number().min(0).max(5).optional(),
      review: z.string().min(1).optional(),
    })
    .strict(), // Ensures only defined fields are allowed
});

export const ReviewZodValidationSchema = {
  createReviewSchema,
  updateReviewSchema,
};
