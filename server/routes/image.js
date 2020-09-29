const router = require("express").Router();

const authRest = require("../middlewares/authRest");
const {
  uploadProfileImages,
  deleteProfileImage,
  uploadPostImage,
} = require("../controllers/image");

router
  .route("/profiles")
  .post(authRest, uploadProfileImages)
  .delete(authRest, deleteProfileImage);

router.route("/posts").post(authRest, uploadPostImage);

module.exports = router;
