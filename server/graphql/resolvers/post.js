const Post = require("../../models/Post");
const User = require("../../models/User");
const auth = require("../../middlewares/auth");

const listPosts = async (_, args, { req, res }) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return posts;
  } catch (error) {
    throw error;
  }
};

const listPostsByUser = async (_, { username }, ctx) => {
  try {
    const postedBy = await User.findOne({ username });
    const posts = await Post.find({ postedBy }).sort({ createdAt: -1 });
    return posts;
  } catch (error) {
    throw error;
  }
};

const createPost = async (_, { input }, { req, res }) => {
  try {
    const currentUser = await auth(req, res);
    const user = await User.findOne({ email: currentUser.email });
    let post = await Post.create({ ...input, postedBy: user._id });
    post = await Post.findById(post._id);
    return post;
  } catch (error) {
    throw error;
  }
};

const updatePost = async (_, { input }, { req, res }) => {
  try {
    const currentUser = await auth(req, res);

    let post = await Post.findById(input.id);

    // Handle post not exits
    if (!post) {
      throw new Error("Post not found.");
    }

    // Handle user not owner of post
    if (post.postedBy.email !== currentUser.email) {
      throw new Error("User not authorized to delte this post.");
    }

    // Update post
    post = await Post.findByIdAndUpdate(
      post._id,
      { ...input },
      { runValidators: true, new: true }
    );

    return post;
  } catch (error) {
    throw error;
  }
};

const deletePost = async (_, { id }, { req, res }) => {
  try {
    const currentUser = await auth(req, res);
    const post = await Post.findById(id);

    // Handle post not exits
    if (!post) {
      throw new Error("Post not found.");
    }

    // Handle user not owner of post
    if (post.postedBy.email !== currentUser.email) {
      throw new Error("User not authorized to delte this post.");
    }

    // Delete post
    await Post.findByIdAndDelete(post._id);
    return post;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  Query: {
    listPosts,
    listPostsByUser,
  },
  Mutation: {
    createPost,
    updatePost,
    deletePost,
  },
};
