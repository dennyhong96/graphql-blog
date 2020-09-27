const admin = require("../services/firebaseAdmin");
const User = require("../models/User");

const authRest = async (req, res, next) => {
  try {
    // Check if there is bearer token in request header
    if (
      !(
        req.headers["authorization"] &&
        req.headers["authorization"].startsWith("Bearer")
      )
    ) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Extract token
    const token = req.headers["authorization"].split(" ")[1];

    console.log(token);

    // Valid token with Firebase
    const currentUser = await admin.auth().verifyIdToken(token);
    console.log("CURRENT USER", currentUser);

    const user = await User.findOne({ email: currentUser.email });
    req.user = user;
    next();
  } catch (error) {
    console.error("AUTH ERROR", error);
    return res
      .status(500)
      .json({ message: "Something went wrong, try again later." });
  }
};

module.exports = authRest;

/*

{
  name: 'Haiyang Hong',
  picture: 'https://lh3.googleusercontent.com/a-/AOh14GjU_jMnZMjtJj4GkjS7mWP65zEE3PUtd_I14dZodA',
  iss: 'https://securetoken.google.com/nextblog-58070',
  aud: 'nextblog-58070',
  auth_time: 1600964894,
  user_id: '04YO2gEn0YPfwFKgvo9DdyjWKi02',
  sub: '04YO2gEn0YPfwFKgvo9DdyjWKi02',
  iat: 1600964894,
  exp: 1600968494,
  email: 'hong961127@gmail.com',
  email_verified: true,
  firebase: {
    identities: { 'google.com': [Array], email: [Array] },
    sign_in_provider: 'google.com'
  },
  uid: '04YO2gEn0YPfwFKgvo9DdyjWKi02'
}

*/
