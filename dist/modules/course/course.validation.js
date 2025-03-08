"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseValidationSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const tagsSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Tag name is required"),
    isDeleted: zod_1.z.boolean().optional().default(false),
});
const detailsSchema = zod_1.z.object({
    level: zod_1.z.string().min(1, "Level is required"),
    description: zod_1.z.string().min(1, "Description is required"),
});
const courseBaseSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    instructor: zod_1.z.string().min(1, "Instructor is required"),
    categoryId: zod_1.z.instanceof(mongoose_1.Types.ObjectId).optional(),
    price: zod_1.z.number().positive("Price must be a positive number"),
    tags: zod_1.z.array(tagsSchema).optional().default([]),
    startDate: zod_1.z.string().min(1, "Start date is required"),
    endDate: zod_1.z.string().min(1, "End date is required"),
    language: zod_1.z.string().min(1, "Language is required"),
    details: detailsSchema,
});
const createCourseSchema = zod_1.z.object({
    body: courseBaseSchema,
});
const updateCourseSchema = zod_1.z.object({
    body: courseBaseSchema.partial(),
});
exports.CourseValidationSchema = {
    createCourseSchema,
    updateCourseSchema,
};
