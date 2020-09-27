const shortId = require("shortid");

const User = require("../../models/User");
const auth = require("../../middlewares/auth");

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

const updateUser = async (_, { input }, { req, res }) => {
  try {
    const currentUser = await auth(req, res);

    // Update database
    user = await User.findOneAndUpdate(
      { email: currentUser.email },
      { ...input },
      { new: true, runValidators: true }
    );

    return user;
  } catch (error) {
    console.error("[updateUser ERROR]", error);

    // Handle Username taken
    if (error.code === 11000) {
      throw new Error(
        `${Object.keys(error.keyPattern).join(", ")} ${Object.values(
          error.keyValue
        ).join(", ")} is already taken.`
      );
    }

    throw error;
  }
};

const getUser = async (_, args, { req, res }) => {
  try {
    const currentUser = await auth(req, res);
    console.log(currentUser);
    const user = await User.findOne({ email: currentUser.email });
    if (!user) {
      throw new Error("User not found.");
    }
    console.log(user);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  Mutation: {
    createUser,
    updateUser,
  },
  Query: {
    getUser,
  },
};
