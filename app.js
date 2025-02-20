import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRouter from "./app/routes/contact.routes.js";
import ApiError from "./app/api-error.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactRouter);

app.get("/", (req, res) => {
  res.json({ message: "welcome" });
});

app.get((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.get((error, req, res, next) => {
  return res.status(error.statusCode || 500).json({
    message: error.message || "Interal Server Error",
  });
});

export default app;
