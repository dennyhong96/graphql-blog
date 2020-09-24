const auth = require("../../middlewares/auth");

const me = async (_, args, { req, res }) => {
  try {
    await auth(req, res);
    return "Denny Hong";
  } catch (error) {
    throw error;
  }
};

module.exports = {
  Query: {
    me,
  },
};
