const favoriteBlog = require("../utils/list_helper").favoriteBlog;
const blogs = require("../utils/list_helper").blogs;

describe("favorite blog", () => {
  test("list of blogs are empty, return empty object", () => {
    expect(favoriteBlog([])).toEqual({});
  });

  test("larger list of blogs return right blog", () => {
    expect(favoriteBlog(blogs)).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });

  test("list has one blog equals favorite blog to that", () => {
    expect(favoriteBlog([blogs[0]])).toEqual({
      title: "React patterns",
      author: "Michael Chan",
      likes: 7,
    });
  });
});
