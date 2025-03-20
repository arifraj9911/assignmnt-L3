import mongoose from "mongoose";
import { TErrorSource, TGenericResponseError } from "../interface/error";

const handleCastError = (
  error: mongoose.Error.CastError
): TGenericResponseError => {
  const statusCode = 400;

  const errorDetails: TErrorSource = [
    { path: error?.path, message: error?.message },
  ];

  return {
    statusCode,
    message: "Cast Validation Error!",
    errorDetails,
  };
};

export default handleCastError;
