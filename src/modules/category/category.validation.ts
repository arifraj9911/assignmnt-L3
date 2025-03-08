import { z } from "zod";

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Category must be given"),
  }),
});

export const CategoryValidationSchema = {
  createCategoryValidationSchema,
};
