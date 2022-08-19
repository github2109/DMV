const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  questionContent: {
    type: String,
    required: [true, "Question content is required"],
    trim: true,
    text: true,
  },
  answers: [
    {
      key: Number,
      content: String,
      isCorrect: Boolean,
    },
    {
      key: Number,
      content: String,
      isCorrect: Boolean,
    },
    {
      key: Number,
      content: String,
      isCorrect: Boolean,
    },
    {
      key: Number,
      content: String,
      isCorrect: Boolean,
    },
  ],
  isTestQuestion: {
    type: Boolean,
    required: [true, "Is test question is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  handBook: {
    type: String,
  },
});

module.exports = mongoose.model("Question", questionSchema);
