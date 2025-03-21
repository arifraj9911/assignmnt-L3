import { model, Schema } from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new Schema<TReview>(
  {
    courseId: { type: Schema.Types.ObjectId, required: true, ref: "Course" },
    rating: { type: Number, required: true, min: 0, max: 5 },
    review: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Review = model<TReview>("Review", reviewSchema);
