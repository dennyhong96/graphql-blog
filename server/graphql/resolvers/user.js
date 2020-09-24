const User = require("../../models/User");
const auth = require("../../middlewares/auth");
const shortId = require("shortid");

const createUser = async (_, args, { req, res }) => {
  try {
    const currentUser = await auth(req, res);

    // Check if user is already in DB
    let user = await User.findOne({ email: currentUser.email });

    if (!user) {
      const userInfo = {
        username: shortId.generate(),
        email: currentUser.email,
      };

      // If user has a profile pic then use it
      if (currentUser.picture) {
        userInfo.images = [
          { url: currentUser.picture, public_id: shortId.generate() },
        ];
      }

      user = await User.create(userInfo);
    }

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  Mutation: {
    createUser,
  },
};
