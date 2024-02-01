const Blog = require("../models/blog");

// get all blogs from DB
const getAllBlogs = async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
};

// create new blog and save it to DB
const create = async (request, response, next) => {
  const body = request.body;

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  const savedBlog = await newBlog.save();
  response.status(201).json(savedBlog);
};

// Get blog with id from DB
const getBlog = async (request, response, next) => {
  response.json({ message: `blog with id ${request.params.id}` });
};

module.exports = { getAllBlogs, create, getBlog };
