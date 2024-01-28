const express = require("express");
require("express-async-errors");
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");
const app = express();

// connect to MongoDB
mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("failed connecting to MongoDB", error.message);
  });

// Middlewares
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
