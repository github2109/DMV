const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const stateSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    text: true,
  },
});
module.exports = mongoose.model("State", stateSchema);
