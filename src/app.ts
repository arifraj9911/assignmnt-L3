import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./middleware/globalErrorHandler";
import notFoundRouteHandler from "./middleware/notFoundRouteHandler";
import cors from "cors";
import router from "./routes";
const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// application router middleware
app.use("/api/v1", router);

// not found handler
app.use(notFoundRouteHandler);

// global error handler middleware
app.use(globalErrorHandler);



export default app;
