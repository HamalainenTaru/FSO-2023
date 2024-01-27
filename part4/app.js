const express = require("express");
require("express-async-errors");
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
// middleware
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
app.use(express.json());

app.use("/api/blogs", blogsRouter);

// Unknown ednpoint
// error handler

module.exports = app;
