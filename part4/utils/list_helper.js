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
  // TODO: palauta author, jolla on eniten blogeja
  // palauta author ja blogien määrä
};

const mostLikes = (blogs) => {
  // TODO: palauta author, jolla on eniten tykkäyksiä blogeissaan
  // palauta author ja likejen yhteismäärä
};

module.exports = { dummy, totalLikes, favoriteBlog };
