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

    // Valid token with Firebase
    const res = await admin.auth().verifyIdToken(token);
    console.log(res);
  } catch (error) {
    console.error("AUTH ERROR", error);
    throw new Error("Invalid credentials.");
  }
};

module.exports = auth;
