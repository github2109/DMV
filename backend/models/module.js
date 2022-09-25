const mongoose = require("mongoose");

const moduleSchema = mongoose.Schema({
  license: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "License",
  },
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
  isPremium: {
    type: Boolean,
    required: [true, "Premium is required"],
  },
  position: {
    type: Number,
    required: [true, "Position is required"],
  },
  states: [
    {
      type: mongoose.Types.ObjectId,
      ref: "State",
    },
  ],
});

module.exports = mongoose.model("Module", moduleSchema);
