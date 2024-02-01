const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },

  url: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

blogSchema.set("toJSON", {
  transform: (document, blog) => {
    blog.id = blog._id.toString();
    delete blog._id;
    delete blog.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
