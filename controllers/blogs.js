const logger = require("../utils/logger");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response, next) => {
  logger.info("Get all the blogs");
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response, next) => {
  logger.info("Get particular blog with id:", request.params.id);
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

blogsRouter.post("/", async (request, response, next) => {
  logger.info("Add new blog", request.body);
  const blog = new Blog(request.body);

  const savedBlog = await blog.save();
  response.json(savedBlog);
});

module.exports = blogsRouter;
