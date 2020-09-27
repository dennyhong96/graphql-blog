const mongoose = require("mongoose");
const shortId = require("shortid");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    images: {
      type: [
        {
          url: String,
          public_id: String,
        },
      ],
      default: [
        {
          url:
            "https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg",
          public_id: shortId.generate(),
        },
      ],
    },
    about: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
