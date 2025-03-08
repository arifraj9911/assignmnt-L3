import { Schema, model } from "mongoose";
import { TCourse } from "./course.interface";
import dayjs from "dayjs";

const tagsSchema = new Schema(
  {
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    _id: false,
  }
);

const detailsSchema = new Schema({
  level: { type: String, required: true },
  description: { type: String, required: true },
});

const courseSchema = new Schema<TCourse>(
  {
    title: { type: String, required: true },
    instructor: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
    price: { type: Number, required: true },
    tags: { type: [tagsSchema], default: [] },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    language: { type: String, required: true },
    durationInWeeks: { type: Number },
    details: { type: detailsSchema, required: true },
  },
  {
    timestamps: true,
  }
);

courseSchema.pre("save", async function (next) {
  if (this.startDate && this.endDate) {
    const start = dayjs(this.startDate);
    const end = dayjs(this.endDate);
    const weeks = end.diff(start, "week");
    this.durationInWeeks = weeks;
  }

  next();
});

const Course = model<TCourse>("Course", courseSchema);

export default Course;
