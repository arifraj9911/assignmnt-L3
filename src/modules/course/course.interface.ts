import { Types } from "mongoose";

export type TTags = {
  name: string;
  isDeleted: boolean;
};

export type TDetails = {
  level: string;
  description: string;
};

export type TCourse = {
  title: string;
  instructor: string;
  category?: Types.ObjectId;
  price: number;
  tags: [TTags];
  startDate: string;
  endDate: string;
  language: string;
  durationInWeeks: number;
  details: TDetails;
};
