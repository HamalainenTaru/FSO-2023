const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");
const { info, error } = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

info("connecting to", config.MONGO_URL);

mongoose
  .connect(config.MONGO_URL)
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => error("failed to connect", err.message));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);
app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

module.exports = app;
