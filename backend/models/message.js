const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
      text: true,
    },
    images: [
      {
        type: String,
      },
    ],
    isAdminSending: {
      type: Boolean,
      required: [true, "This item is required"],
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Message", messageSchema);
