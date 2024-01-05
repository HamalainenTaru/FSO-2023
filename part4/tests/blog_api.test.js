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

// GET
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

// OTHER
describe("Other tests", () => {
  test("Blogs have id", async () => {
    const blogs = await helper.blogsInDb();
    const blog = blogs[0];
    expect(blog.id).toBeDefined();
  });
});

// POST
describe("Testing POST methods", () => {
  test("Valid blog can be added to db", async () => {
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
  test("POST request dont contain title", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const newBlog = {
      author: "zero likes",
      url: "ttps://reactpatterns.com/",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtStart.length === blogsAtEnd.length);
  });

  test("POST request dont contain url", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const newBlog = {
      title: "Test title",
      author: "zero likes",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtStart.length === blogsAtEnd.length);
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
});

describe("DELETE", () => {
  test("deleting blog", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToDelete = blogsAtStart[0];

    // responding with correct statuscode
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    // blogs count is less
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length === blogsAtStart.length - 1);

    // deleted content dont exist in db
    const contents = blogsAtEnd.map((blog) => blog.title);
    expect(contents).not.toContain(blogToDelete.title);
  });
});

// PUT
describe("Testing PUT methods", () => {
  test("updating likes returns new likes", async () => {
    let blogs = await helper.blogsInDb();
    const blogToUpdate = blogs[0];

    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);

    blogs = await helper.blogsInDb();

    expect(blogs[0].likes).toEqual(blogToUpdate.likes + 1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
