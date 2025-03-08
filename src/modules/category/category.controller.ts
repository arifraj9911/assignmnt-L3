/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CategoryServices } from "./category.service";

const createCategory = catchAsync(async (req, res, next) => {
  const result = await CategoryServices.createCategoryIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});
const getAllCategory = catchAsync(async (req, res, next) => {
  const result = await CategoryServices.getAllCategoryFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category retrieved successfully",
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategory,
};
