const Blog = require("../models/blog");
const initBlogs = [
  {
    title: "TEST Another String1",
    author: "Another String2",
    url: "http://google.com",
    likes: 51,
  },
  {
    title: "TEST String11",
    author: "Another String22",
    url: "http://yahoo.com",
    likes: 69,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initBlogs,
  blogsInDb
}