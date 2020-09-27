const router = require("express").Router();

const authRest = require("../middlewares/authRest");
const { uploadProfileImages } = require("../controllers/image");

router.route("/profiles").post(authRest, uploadProfileImages);

module.exports = router;
