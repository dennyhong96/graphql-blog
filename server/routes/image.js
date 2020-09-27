const router = require("express").Router();

const authRest = require("../middlewares/authRest");
const {
  uploadProfileImages,
  deleteProfileImage,
} = require("../controllers/image");

router
  .route("/profiles")
  .post(authRest, uploadProfileImages)
  .delete(authRest, deleteProfileImage);

module.exports = router;
