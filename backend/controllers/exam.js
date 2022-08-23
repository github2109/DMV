const Exam = require("../models/exam");

exports.createExamAPI = async (req, res, next) => {
  try {
    const stateId = req.query.stateId;
    const licenseId = req.query.licenseId;
    if (!stateId || !licenseId) {
      return res.status(500).json({
        message: "Invalid state ID or license ID",
      });
    }
    const { numberOfQuestion } = req.body;
    const exam = await new Exam({
      numberOfQuestion,
      state: stateId,
      license: licenseId,
    });
    const examSaved = await exam.save();
    res.status(201).json({ examSaved, message: "Created exam successfully." });
  } catch (error) {
    next(error);
  }
};
exports.getExamInfoAPI = async (req, res, next) => {
  try {
    const stateId = req.query.stateId;
    const licenseId = req.query.licenseId;
    if (!stateId || !licenseId) {
      return res.status(500).json({
        message: "Invalid state ID or license ID",
      });
    }
  } catch (error) {
    next(error);
  }
};
getListQuestionForExam = async (stateId, licenseId) => {
  try {
    const listQuestions = await exam.find({});
  } catch (error) {
    console.log(error);
  }
};
exports.updateExamAPI = async (req, res, next) => {
  try {
    const examId = req.params.id;
    if (!examId) {
      return res.status(500).json({
        message: "Invalid exam ID",
      });
    }
    const updatedQuestion = await Exam.findByIdAndUpdate(
      { _id: examId },
      req.body,
      { new: true }
    );
    if (!updatedQuestion) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
    res.status(201).json({ updatedQuestion });
  } catch (error) {
    next(error);
  }
};
exports.deleteExamByIdAPI = async (req, res, next) => {
  try {
    const examId = req.params.id;
    if (!examId) {
      return res.status(500).json({
        message: "Invalid exam ID",
      });
    }
    const deleteExam = await Exam.findByIdAndDelete({ _id: examId });
    if (!deleteExam) {
      res.status(500).json({
        message: "something went wrong",
      });
    }
    res.status(200).json(deleteExam);
  } catch (error) {
    next(error);
  }
};
