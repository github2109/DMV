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
});

module.exports = mongoose.model("User", userSchema);
