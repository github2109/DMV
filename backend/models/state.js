const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const stateSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    text: true,
  },
  modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],
});
module.exports = mongoose.model("State", examSchema);
