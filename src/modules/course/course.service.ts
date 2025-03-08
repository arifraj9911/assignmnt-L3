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

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
};
