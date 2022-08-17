const mongoose = require("mongoose");

const moduleSchema = mongoose.Schema({
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
  },
  license: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "License",
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  name: {
    type: String,
    required: [true, "Module name is required"],
    trim: true,
    text: true,
  },
  titleDescription: {
    type: String,
    required: [true, "Title description is required"],
    trim: true,
  },
  contentDescription: {
    type: String,
    required: [true, "Content description is required"],
    trim: true,
  },
  imageDescription: {
    type: String,
    required: [true, "Image description is required"],
    trim: true,
  },
  position: {
    type: Number,
    required: [true, "Position is required"],
  },
  isPremium: {
    type: Boolean,
    required: [true, "Premium is required"],
  },
});

module.exports = mongoose.model("Module", moduleSchema);
