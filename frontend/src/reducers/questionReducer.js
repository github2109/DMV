import { createSlice } from "@reduxjs/toolkit";
import questionService from "../services/question";
const questionSlice = createSlice({
  name: "question",
  initialState: [],
  reducers: {
    setQuestions: (state, action) => {
      return action.payload;
    },
    updateQuestion: (state, action) => {
      return state.map(question => question._id !== action.payload._id ? question : action.payload);
    },
    createQuestion: (state, action) => {
      state.push(action.payload);
    },
    deleteQuestion:(state, action) => {
      return state.filter(question => question._id !== action.payload);
    }
  },
});


export const setQuestionByModuleId = (moduleId) => {
  return async (dispatch) => {
    const questions = await questionService.getQuestionByModuleId(moduleId);
    dispatch(questionSlice.actions.setQuestions(questions));
  };
};

export const updateQuestion = (oldQuestion, newQuestion) => {
  return async (dispatch) => {
    const question = await questionService.updateQuestion(oldQuestion, newQuestion);
    dispatch(questionSlice.actions.updateQuestion(question));
  }
}

export const createQuestion = (newQuestion,moduleId) => {
  return async (dispatch) => {
    newQuestion.module = moduleId;
    const question = await questionService.createQuestion(newQuestion);
    dispatch(questionSlice.actions.createQuestion(question));
  }
}

export const deleteQuestion = (question) => {
  return async (dispatch) => {
    await questionService.deleteQuestion(question);
    dispatch(questionSlice.actions.deleteQuestion(question._id));
  }
}

export default questionSlice.reducer;
