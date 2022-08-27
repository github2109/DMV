const mongoose = require("mongoose");

const examSchema = mongoose.Schema({
  // name: {
  //   type: String,
  //   required: [true, "Name is required"],
  //   trim: true,
  //   text: true,
  // },
  name:{
    type:String,
    required: [true, "Name of exam is required"],
    trim:true
  },
  timeOfExam:{
    type:Number,
    required: [true, "Time of exam is required"],
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
