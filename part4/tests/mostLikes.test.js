const mostLikes = require("../utils/list_helper").mostLikes;
const blogs = require("../utils/list_helper").blogs;

describe("Most likes", () => {
  test("list of blogs are empty, return {}", () => {
    expect(mostLikes([])).toEqual({});
  });

  test("list of blogs has one blog, equals to that", () => {
    expect(mostLikes([blogs[0]])).toEqual({ author: "Michael Chan", likes: 7 });
  });

  test("larger list return right author and likes", () => {
    expect(mostLikes(blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
