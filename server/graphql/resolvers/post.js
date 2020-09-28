const auth = require("../../middlewares/auth");

const listPosts = async (_, args, { req, res }) => {
  try {
  } catch (error) {}
};

const createPost = (_, { input }, ctx) => {};

module.exports = {
  Query: {
    listPosts,
  },
  Mutation: {
    createPost,
  },
};
