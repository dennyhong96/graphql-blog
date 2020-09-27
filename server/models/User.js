const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

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
          key: String,
        },
      ],
      default: [
        {
          url:
            "https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg",
          key: uuidv4(),
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
