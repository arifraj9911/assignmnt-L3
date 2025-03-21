import { TReview } from "./review.interface";
import { Review } from "./review.model";

const createReviewIntoDB = async (payload: TReview) => {
  const result = await Review.create(payload);

  return result;
};

const getAllReviewFromDB = async () => {
  const result = await Review.find();

  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
  getAllReviewFromDB,
};
