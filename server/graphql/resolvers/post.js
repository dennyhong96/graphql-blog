const Post = require("../../models/Post");
const User = require("../../models/User");
const auth = require("../../middlewares/auth");

const listPosts = async (_, args, { req, res }) => {
  try {
    const posts = await Post.find();
    return posts;
  } catch (error) {
    throw error;
  }
};

const createPost = async (_, { input }, { req, res }) => {
  try {
    const currentUser = await auth(req, res);
    const user = await User.findOne({ email: currentUser.email });
    const post = await Post.create({ ...input, postedBy: user._id });
    return post;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  Query: {
    listPosts,
  },
  Mutation: {
    createPost,
  },
};
