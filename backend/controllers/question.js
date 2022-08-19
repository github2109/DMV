const config = require("../utils/config");
const Question = require("../models/question");
const { getModuleByModuleId } = require("../controllers/module");
const question = require("../models/question");

exports.getAllQuestionsForExamAPI = async (req, res, next) => {
  try {
    const moduleId = req.query.moduleId;
    const questions = await getAllQuestionsForModule(moduleId, true);
    if (!questions) {
      return res.status(500).json({
        message: "No questions found",
      });
    }
    res
      .status(200)
      .json({ questions, message: "Get list questions for exam successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getAllQuestionsForModuleAPI = async (req, res, next) => {
  try {
    const moduleId = req.query.moduleId;
    const questions = await getAllQuestionsForModule(moduleId, false);
    if (!questions) {
      return res.status(500).json({
        message: "No questions found",
      });
    }
    res.status(200).json({ questions, message: "List questions of module" });
  } catch (error) {
    next(error);
  }
};
const getAllQuestionsForModule = async (moduleId, isExam) => {
  const module = await getModuleByModuleId(moduleId);
  if (!module) {
    return null;
  } else {
    const listQuestions = await module.questions;
    const results = listQuestions.filter(
      (question) => question.isTestQuestion === isExam
    );
    return results;
  }
};

exports.createQuestionAPI = async (req, res, next) => {
  try {
    const { questionContent, answers, isTestQuestion, image, handBook } =
      req.body;
    const check = await Question.findOne({ questionContent: questionContent });
    if (check) {
      return res.status(200).json({
        message:
          "This question was already exists. Please use another question",
      });
    }
    const newQuestion = await new Question({
      questionContent,
      answers,
      isTestQuestion,
      image,
      handBook,
    });
    const savedQuestion = await newQuestion.save();
    res
      .status(201)
      .json({ savedQuestion, message: "Question was created successfully" });
  } catch (error) {
    next(error);
  }
};
exports.deleteQuestionByIdAPI = async (req, res, next) => {
  try {
    const questionId = req.params.id;
    const deletedQuestion = await Question.findByIdAndRemove({
      _id: questionId,
    });
    if (!deletedQuestion) {
      return res.status(500).json({ message: "Question not found" });
    }
    res
      .status(200)
      .json({ deletedQuestion, message: "Question was deleted successfully" });
  } catch (error) {
    next(error);
  }
};
