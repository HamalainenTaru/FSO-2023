const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  return blogs.map((blog) => blog.likes).reduce((cur, next) => cur + next, 0);
};

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((prev, cur) =>
    prev.likes < cur.likes ? cur : prev
  );

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};
  const authors = blogs.map((blog) => blog.author);

  const counts = {};
  for (const count of authors) {
    counts[count] = counts[count] ? counts[count] + 1 : 1;
  }

  let author_with_most_blogs = "";
  let maxBlogs = 0;
  for (let [author, blogs] of Object.entries(counts)) {
    if (blogs > maxBlogs) {
      maxBlogs = blogs;
      author_with_most_blogs = author;
    }
  }

  return {
    author: author_with_most_blogs,
    blogs: maxBlogs,
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};
  let likesCount = blogs.reduce((likesCount, blog) => {
    likesCount[blog.author] = (likesCount[blog.author] || 0) + blog.likes;
    return likesCount;
  }, {});

  let max = Math.max(...Object.values(likesCount));
  let mostLikes = Object.keys(likesCount).filter(
    (author) => likesCount[author] === max
  );
  return {
    author: mostLikes[0],
    likes: max,
  };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
