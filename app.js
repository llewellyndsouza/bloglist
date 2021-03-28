const config = require("./utils/config");
const logger = require("./utils/logger");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");

logger.info("connecting to MongoDB");

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    logger.info("Connected to MongoDB");
  })
  .catch((err) => {
    logger.error("Failed to connect to MongoDB", err);
  });

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

module.exports = app;
