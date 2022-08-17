const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

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
  isAdmin: {
    type: Boolean,
    required: [true, "This item is required"],
  },
  sendingTime: {
    type: Date,
    require: [true, "Sending time is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Message", messageSchema);
