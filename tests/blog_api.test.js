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

  test("returned object has id", async () => {
    const response = await helper.blogsInDb();
    expect(response[0].id).toBeDefined();
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
