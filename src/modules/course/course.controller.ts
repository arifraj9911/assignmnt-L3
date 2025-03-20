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

const getCourseByIdWithReviews = catchAsync(async (req, res, next) => {
  //   console.log(req.query);
  const { courseId } = req.params;
  const result = await CourseServices.getCourseByIdWithReviewsFromDB(courseId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Course and Reviews retrieved successfully",
    data: result,
  });
});

const getBestCourseByAvgRating = catchAsync(async (req, res, next) => {
  
  const result = await CourseServices.getBestCourseByAvgRatingFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Best course retrieved successfully",
    data: result,
  });
});


const updateCourse = catchAsync(async (req, res, next) => {
  //   console.log(req.query);
  const { id } = req.params;
  const result = await CourseServices.updateCourseIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Sucessfully updated course",
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourse,
  updateCourse,
  getCourseByIdWithReviews,
  getBestCourseByAvgRating
};
