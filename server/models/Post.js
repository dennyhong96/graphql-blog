const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    content: {
      type: String,
      required: [true, "Content is required."],
    },
    tags: {
      type: [String],
      validate: {
        validator: (v) => v.length <= 5,
        message: "A post can have at most 5 tags",
      },
    },
    image: {
      type: {
        url: {
          type: String,
        },
        key: {
          type: String,
        },
      },
      default: {
        url:
          "https://www.mub.eps.manchester.ac.uk/science-engineering/wp-content/themes/uom-theme/assets/images/default-thumbnail.jpg",
        key: "",
      },
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exposts = mongoose.model("Post", postSchema);
