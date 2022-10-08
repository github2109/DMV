const Question = require("../models/question");
const {
  getListModuleIdByStateIdAndLicenseId,
} = require("../controllers/module");
const { getExamByExamId } = require("../controllers/exam");
const { validateQuestion } = require("../Validators/validators");

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
    const {page} = req.query;
    const pageQuery = page ? page : 1;
    const moduleId = req.params.moduleId;
    const questions = await Question.find({ module: moduleId }).skip((pageQuery-1)*10).limit(10);
    return res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
};

exports.createQuestionAPI = async (req, res, next) => {
  try {
    const result = await validateQuestion(req.body);
    const savedQuestion = await new Question(result).save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    next(error);
  }
};
exports.deleteQuestionByIdAPI = async (req, res, next) => {
  try {
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
    const result = await validateQuestion(req.body);
    const questionId = req.params.id;
    const updatedQuestion = await Question.findByIdAndUpdate(
      { _id: questionId },
      result,
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
