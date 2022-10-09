const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  deviceId: {
    type: String,
  },
  role: {
    type: String,
    required: [true, "Role is required"],
  },
  recentMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
});

userSchema.pre("save", async function (next) {
  try {
    console.log(`save `, this.password);
    const salt = await bcrypt.genSalt(12);
    const cryptedPassword = await bcrypt.hash(this.password, salt);
    console.log(cryptedPassword);
    this.password = cryptedPassword;
    next();
  } catch (error) {
    next(error);
  }
});
module.exports = mongoose.model("User", userSchema);
