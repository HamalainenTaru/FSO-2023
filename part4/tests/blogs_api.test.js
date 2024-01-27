const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const blog = require("../models/blog");

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("amount of blogs are equal to initialBlogs", async () => {
  const { body } = await api.get("/api/blogs");
  expect(body).toHaveLength(initialBlogs.length);
});

test("blog has id", async () => {
  const { body } = await api.get("/api/blogs");
  body.forEach((blog) => {
    expect(blog.id).toBeDefined();
  });
});

test("posting blog increases amount of blogs by one", async () => {
  const blog = {
    title: "test title",
    author: "test author",
    url: "test url",
    likes: 10,
  };

  await api
    .post("/api/blogs")
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtTheEnd = await api.get("/api/blogs");
  const { body } = blogsAtTheEnd;
  expect(body).toHaveLength(initialBlogs.length + 1);
});

test("if likes is not given, likes equal to 0", async () => {
  const blog = {
    title: "test title",
    author: "test author",
    url: "test url",
  };

  await api
    .post("/api/blogs")
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtTheEnd = await api.get("/api/blogs");
  const { body } = blogsAtTheEnd;

  expect(body[body.length - 1].likes).toBe(0);
});

afterAll(async () => {
  await mongoose.connection.close();
});
