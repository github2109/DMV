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
