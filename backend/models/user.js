const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  deviceId:{
    type: String,
  },
  role: {
    type: String,
    required: [true, "Role is required"],
  },
  recentMessage:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Message"
  }
});

module.exports = mongoose.model("User", userSchema);
