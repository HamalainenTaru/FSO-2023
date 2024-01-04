require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// mongo
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  ulr: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);
const mongoUrl = process.env.MONGO_URI;
mongoose.connect(mongoUrl);

// middleware
app.use(cors());
app.use(express.json());

// routes
app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
