const mongoose = require("mongoose");

const stateSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    text: true,
  },
});
module.exports = mongoose.model("State", stateSchema);
