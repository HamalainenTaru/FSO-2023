const mostBlogs = require("../utils/list_helper").mostBlogs;
const blogs = require("../utils/list_helper").blogs;

describe("most blogs", () => {
  test("list of blogs are empty, return {}", () => {
    expect(mostBlogs([])).toEqual({});
  });

  test("list of blogs has only one blog equals to that", () => {
    expect(mostBlogs([blogs[0]])).toEqual({ author: "Michael Chan", blogs: 1 });
  });

  test("larger list returns right author and amount of blogs", () => {
    expect(mostBlogs(blogs)).toEqual({ author: "Robert C. Martin", blogs: 3 });
  });
});
