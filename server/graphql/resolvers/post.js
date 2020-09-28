const auth = require("../../middlewares/auth");

const POSTS = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, accusantium!",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, accusantium!",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, accusantium!",
  },
];

const totalPosts = async (_, args, { req, res }) => {
  try {
    await auth(req, res);
    return POSTS.length;
  } catch (error) {
    throw error;
  }
};

const listPosts = async (_, args, { req, res }) => {
  try {
    return POSTS;
  } catch (error) {
    throw error;
  }
};

const createPost = (_, { input }, ctx) => {
  const id = POSTS.map((p) => p.id).sort((a, b) => a - b)[POSTS.length - 1] + 1;
  const newPost = { id, ...input };
  POSTS.push(newPost);
  return newPost;
};

module.exports = {
  Query: {
    totalPosts,
    listPosts,
  },
  Mutation: {
    createPost,
  },
};
