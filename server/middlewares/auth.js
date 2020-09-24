const admin = require("firebase-admin");
const serviceAccount = require("../config/firebase-admin-service-key.json");
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const auth = async (req, res) => {
  try {
    // Check if there is bearer token in request header
    if (
      !(
        req.headers["authorization"] &&
        req.headers["authorization"].startsWith("Bearer")
      )
    ) {
      throw new Error();
    }

    // Extract token
    const token = req.headers["authorization"].split(" ")[1];

    console.log(token);

    // Valid token with Firebase
    const currentUser = await admin.auth().verifyIdToken(token);
    console.log("CURRENT USER", currentUser);
    return currentUser;
  } catch (error) {
    console.error("AUTH ERROR", error);
    throw new Error("Invalid credentials.");
  }
};

module.exports = auth;

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
