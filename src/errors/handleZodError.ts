import { ZodError } from "zod";
import { TErrorSource, TGenericResponseError } from "../interface/error";

const handleZodError = (err: ZodError): TGenericResponseError => {
  const statusCode = 400;

  const errorDetails: TErrorSource = err.issues.map((issue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  return {
    statusCode,
    message: "Validation Error!",
    errorDetails,
  };
};

export default handleZodError;
