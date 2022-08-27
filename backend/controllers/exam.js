const Exam = require("../models/exam");

exports.createExamAPI = async (req, res, next) => {
  try {
    const { stateId, licenseId } = req.query;
    if (!stateId || !licenseId) {
      return res.status(500).json({
        message: "Invalid state ID or license ID",
      });
    }
    const exam = req.body;
    const examSaved = await new Exam({
      exam,
      state: stateId,
      license: licenseId,
    }).save();
    res.status(201).json(examSaved);
  } catch (error) {
    next(error);
  }
};
exports.getListExamByStateAndLicenseAPI = async (req, res, next) => {
  try {
    const { stateId, licenseId } = req.query;
    const exams = await Exam.find({ state: stateId, license: licenseId });
    res.status(200).json(exams);
  } catch (error) {
    next(error);
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
    res.status(201).json(updatedQuestion);
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
exports.getExamByExamIdAPI = async (req, res, next) => {
  try {
    const { examId } = req.params;
    if (!examId) {
      return res.status(500).json({
        message: "Invalid exam ID",
      });
    }
    const exam = await Exam.findById(examId).select({
      numberOfQuestion: 1,
      timeOfExam: 1,
      name: 1,
    });
    res.status(200).json(exam);
  } catch (error) {
    next(error);
  }
};
