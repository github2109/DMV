const Question = require("../models/question");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const {
  getListModuleIdByStateIdAndLicenseId,
} = require("../controllers/module");
const { getExamByExamId } = require("../controllers/exam");

exports.getQuestionsForExamAPI = async (req, res, next) => {
  try {
    const { examId } = req.params;
    const exam = await getExamByExamId(examId);
    const modules = await getListModuleIdByStateIdAndLicenseId(
      exam.state,
      exam.license
    );
    const listQuestions = await Question.find({
      module: { $in: modules },
      isTestQuestion: true,
    });
    const questions = [];
    const length = listQuestions.length;
    for (
      let i = 0;
      i < (exam.numberOfQuestion < length ? exam.numberOfQuestion : length);
      i++
    ) {
      const index = Math.floor(Math.random() * listQuestions.length);
      questions.push(listQuestions[index]);
      listQuestions.splice(index, 1);
    }
    if (!questions) {
      return res.status(500).json({
        message: "No questions found",
      });
    }
    res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
};

exports.getAllQuestionsForModuleAPI = async (req, res, next) => {
  try {
    const moduleId = req.params.moduleId;
    const questions = await Question.find({ module: moduleId });
    return res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
};

exports.createQuestionAPI = async (req, res, next) => {
  try {
    const token = req.token;
    const decodeToken = jwt.verify(token, config.SECRET);
    if (!decodeToken.id || !decodeToken.role)
      return res.status(403).json({ message: "Token missing or invalid" });
    if (decodeToken.role !== "ADMIN")
      return res.status(403).json({ message: "Role is not allowed" });
    const question = req.body;
    const savedQuestion = await new Question(question).save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    next(error);
  }
};
exports.deleteQuestionByIdAPI = async (req, res, next) => {
  try {
    const token = req.token;
    const decodeToken = jwt.verify(token, config.SECRET);
    if (!decodeToken.id || !decodeToken.role)
      return res.status(403).json({ message: "Token missing or invalid" });
    if (decodeToken.role !== "ADMIN")
      return res.status(403).json({ message: "Role is not allowed" });
    const { questionId } = req.params;
    const deletedQuestion = await Question.findByIdAndRemove({
      _id: questionId,
    });
    if (!deletedQuestion) {
      return res.status(500).json({ message: "Question not found" });
    }
    res.status(200).json(deletedQuestion);
  } catch (error) {
    next(error);
  }
};
exports.updateQuestionByIdAPI = async (req, res, next) => {
  try {
    const token = req.token;
    const decodeToken = jwt.verify(token, config.SECRET);
    if (!decodeToken.id || !decodeToken.role)
      return res.status(403).json({ message: "Token missing or invalid" });
    if (decodeToken.role !== "ADMIN")
      return res.status(403).json({ message: "Role is not allowed" });
    const questionId = req.params.id;
    const updatedQuestion = await Question.findByIdAndUpdate(
      { _id: questionId },
      req.body,
      { new: true }
    );
    if (!updatedQuestion) {
      return res.status(500).json({ message: "Something went wrong" });
    }
    res.status(200).json(updatedQuestion);
  } catch (error) {
    next(error);
  }
};
