const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  content: {
    type: String,
    required: [true, "Content is required"],
    trim: true,
    text: true,
  },
  image: {
    type: String,
  },
  isAdminSending: {
    type: Boolean,
    required: [true, "This item is required"],
  },
  sendingTime: {
    type: Date,
    require: [true, "Sending time is required"],
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Message", messageSchema);
