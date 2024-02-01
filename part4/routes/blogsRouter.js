const blogsRouter = require("express").Router();
const blogsController = require("../controllers/blogsController");

blogsRouter
  .route("/")
  .get(blogsController.getAllBlogs)
  .post(blogsController.create);

blogsRouter.route("/:id").get(blogsController.getBlog);

module.exports = blogsRouter;
