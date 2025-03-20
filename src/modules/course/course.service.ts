import { Review } from "../review/review.model";
import { TCourse } from "./course.interface";
import Course from "./course.model";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);

  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const { searchTerm, sort, tags, page, limit, fields, ...otherFilters } =
    query;

  let searchQuery: Record<string, unknown> = {};

  if (searchTerm) {
    searchQuery = {
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { instructor: { $regex: searchTerm, $options: "i" } },
        { language: { $regex: searchTerm, $options: "i" } },
      ],
    };
  }

  if (tags) {
    searchQuery.tags = {
      $elemMatch: {
        name: tags,
      },
    };
  }

  let sortQuery = "-__v";

  if (sort) {
    sortQuery = sort as string;
  }

  let pageNumber = 1;
  let limitNumber = 10;
  let skip = 0;

  if (limit) {
    limitNumber = Number(query.limit);
  }

  if (page) {
    pageNumber = Number(query.page);
    skip = (pageNumber - 1) * limitNumber;
  }

  let fieldsQuery = "";

  if (fields) {
    fieldsQuery = (fields as string).split(",").join(" ");
  }

  const finalQuery = { ...searchQuery, ...otherFilters };

  const result = await Course.find(finalQuery)
    .populate("category")
    .sort(sortQuery)
    .skip(skip)
    .limit(limitNumber)
    .select(fieldsQuery);

  const totalCount = await Course.countDocuments(finalQuery);

  return {
    result,
    meta: {
      page,
      limit,
      total: totalCount,
    },
  };
};

const getCourseByIdWithReviewsFromDB = async (courseId: string) => {
  const courseData = await Course.findById(courseId);

  const reviewsData = await Review.find({ courseId });

  return {
    course: courseData,
    reviews: reviewsData,
  };
};

const getBestCourseByAvgRatingFromDB = async () => {
  const result = await Course.aggregate([
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "courseId",
        as: "reviews",
      },
    },

    {
      $addFields: {
        reviewCount: { $size: "$reviews" },
        averageRatings: {
          $cond: {
            if: { $gt: [{ $size: "$reviews" }, 0] },
            then: { $avg: "$reviews.rating" },
            else: 0,
          },
        },
      },
    },
    {
      $sort: { averageRatings: -1 },
    },
    {
      $limit: 1,
    },
    { $project: { reviews: 0 } },
  ]);

  return {
    course: result,
  };
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { details, tags, ...otherFields } = payload;

  const modifiedData: Record<string, unknown> = {
    ...otherFields,
  };

  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedData[`details.${key}`] = value;
    }
  }

  if (tags && Array.isArray(tags)) {
    tags.forEach((tag, idx) => {
      Object.entries(tag).forEach(([key, value]) => {
        modifiedData[`tags.${idx}.${key}`] = value;
      });
    });
  }

  const result = await Course.findByIdAndUpdate(id, modifiedData, {
    new: true,
  });

  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  updateCourseIntoDB,
  getCourseByIdWithReviewsFromDB,
  getBestCourseByAvgRatingFromDB,
};
