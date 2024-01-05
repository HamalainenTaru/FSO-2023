const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  return blogs.map((blog) => blog.likes).reduce((cur, next) => cur + next, 0);
};

module.exports = { dummy, totalLikes };