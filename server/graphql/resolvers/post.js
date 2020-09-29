const Post = require("../../models/Post");
const auth = require("../../middlewares/auth");

const listPosts = async (_, args, { req, res }) => {
  try {
    const posts = await Post.find();
    return posts;
  } catch (error) {
    throw error;
  }
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
