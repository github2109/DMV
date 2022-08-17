const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const examSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    text: true,
  },
  numberOfQuestion: {
    type: Number,
    required: [true, "Number of question is required"],
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
  },
  license: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "License",
  },
});
module.exports = mongoose.model("Exam", examSchema);
