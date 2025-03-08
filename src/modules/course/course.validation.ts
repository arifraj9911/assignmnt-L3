import { z } from "zod";
import { Types } from "mongoose";

const tagsSchema = z.object({
  name: z.string().min(1, "Tag name is required"),
  isDeleted: z.boolean().optional().default(false),
});

const detailsSchema = z.object({
  level: z.string().min(1, "Level is required"),
  description: z.string().min(1, "Description is required"),
});

const courseBaseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  instructor: z.string().min(1, "Instructor is required"),
  category: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid Category Id",
  }),
  price: z.number().positive("Price must be a positive number"),
  tags: z.array(tagsSchema).optional().default([]),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  language: z.string().min(1, "Language is required"),
  details: detailsSchema,
});
const createCourseSchema = z.object({
  body: courseBaseSchema,
});

const updateCourseSchema = z.object({
  body: courseBaseSchema.partial(),
});

export const CourseValidationSchema = {
  createCourseSchema,
  updateCourseSchema,
};
