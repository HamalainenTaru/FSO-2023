const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./utils/config");
const cors = require("cors");
const blogsRouter = require("./routes/blogsRouter");
const Middleware = require("./utils/middleware");

// connecting to MongoDB
mongoose.set("strictQuery", false);
console.log("Connecting to MongoDB", config.MONGO_URI);
mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error.message);
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(Middleware.requestLogger);

// Routes
app.use("/api/blogs", blogsRouter);

module.exports = app;
