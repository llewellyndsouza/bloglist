const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const mongoose = require("mongoose");
const helper = require("./test_helper");

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe("blog api", () => {
  test("notes are returned as json", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("returned object has 'id'", async () => {
    const response = await helper.blogsInDb();
    expect(response[0].id).toBeDefined();
  });

  test("new blog is created in db", async () => {
    let blogObj = new Blog({
      title: "TEST new String11",
      author: "Another new String22",
      url: "http://fb.com",
      likes: 420,
    });
    let newBlog = await blogObj.save();

    let response = await helper.blogsInDb();
    expect(response.length).toBe(helper.initBlogs.length + 1);
    expect(response[response.length - 1].title).toBe(blogObj.title);
  });

  test("likes default to 0 when missing", async () => {
    let blogObj = new Blog({
      title: "TEST default String11",
      author: "Another default String22",
      url: "http://maps.com",
    });
    let newBlog = await blogObj.save();

    let response = await helper.blogsInDb();
    expect(response[response.length - 1].likes).toBe(0);
  });

  test("check for missing title or url", async () => {
    let blogObj = new Blog({
      author: "Another default String22",
      url: "http://maps.com",
    });
    let response = await api.post("/api/blogs").send(blogObj).expect(400);
  });

  // test("there are 2 notes", async () => {
  //   const response = await helper.blogsInDb();
  //   expect(response).toHaveLength(helper.initBlogs.length);
  // });

  // test("first note content check", async () => {
  //   const response = await helper.blogsInDb();
  //   const titles = response.map((r) => r.title);
  //   expect(titles).toContain(helper.initBlogs[0].title);
  // });
});

afterAll(() => {
  mongoose.connection.close();
});
