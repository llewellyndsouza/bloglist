const totalLikes = (blogs) => {
  return blogs.reduce((pre, cur) => pre + cur.likes, 0);
};

const favouriteBlog = (blogs) => {
  let result = {};
  if (blogs.length)
    result = blogs.reduce(
      (pre, cur) => (cur.likes > pre.likes ? cur : pre),
      blogs[0]
    );
  return result;
};

module.exports = {
  totalLikes,
  favouriteBlog,
};
