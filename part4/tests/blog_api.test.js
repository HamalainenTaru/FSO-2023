const helper = require("./test_helper");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("Testing GET methods", () => {
  test("All blogs are retuned as JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("There are as many blogs returned as DB has blogs ", async () => {
    const response = await api.get("/api/blogs");
    const blogs = response.body;
    expect(blogs).toHaveLength(helper.initialBlogs.length);
  });
});

test("Blogs have id", async () => {
  const blogs = await helper.blogsInDb();
  const blog = blogs[0];
  expect(blog.id).toBeDefined();
});

test("Testing POST method", async () => {
  const newBlog = {
    title: "My test blog",
    author: "Thats me",
    url: "ttps://reactpatterns.com/",
    likes: 34,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const notesAtTheEnd = await helper.blogsInDb();
  expect(notesAtTheEnd).toHaveLength(helper.initialBlogs.length + 1);
});

test("if likes is not given to blog, value is 0 by default", async () => {
  const newBlog = {
    title: "this has zero likes",
    author: "zero likes",
    url: "ttps://reactpatterns.com/",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await helper.blogsInDb();
  const addedBlog = blogs.find((blog) => blog.author === "zero likes");
  expect(addedBlog.likes === 0);
});

afterAll(async () => {
  await mongoose.connection.close();
});
