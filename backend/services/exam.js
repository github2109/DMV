const Exam = require("../models/exam");
exports.getExamByExamId = async (examId) => {
  try {
    if (!examId) {
      return res.status(500).json({
        message: "Invalid exam ID",
      });
    }
    return await Exam.findById(examId);
  } catch (error) {
    next(error);
  }
};
