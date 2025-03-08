/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async (req, res, next) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Sucessfully created course",
    data: result,
  });
});
const getAllCourse = catchAsync(async (req, res, next) => {
//   console.log(req.query);
  const result = await CourseServices.getAllCourseFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Sucessfully getting all course",
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourse,
};
