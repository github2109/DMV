import { createSlice } from "@reduxjs/toolkit";
import examService from "../services/exam";

const examSlice = createSlice({
  name: "exam",
  initialState: [],
  reducers: {
    setExams(exam, action) {
      return action.payload;
    },
    appendExam(exam, action) {
      exam.push(action.payload);
    },
    deleteExam(exam, action) {
      return exam.filter((exam) => exam._id !== action.payload);
    },
    updateExam(exam, action) {
      return exam.map((addExam) =>
        addExam._id !== action.payload._id ? addExam : action.payload
      );
    },
  },
});

export const initializeExam = (stateId, licenseId) => {
  return async (dispatch) => {
    const exams = await examService.getExamByStateIdAndLicenseId(
      stateId,
      licenseId
    );
    dispatch(examSlice.actions.setExams(exams));
  };
};
export const createExam = (exam, stateId, licenseId) => {
  return async (dispatch) => {
    const examSaved = await examService.createExam(exam, stateId, licenseId);
    dispatch(examSlice.actions.appendExam(examSaved));
  };
};
export const deleteExam = (exam) => {
  return async (dispatch) => {
    const examDeleted = await examService.deleteExam(exam._id);
    dispatch(examSlice.actions.deleteExam(exam._id));
  };
};

export const updateExam = (oldExam, newExam) => {
  return async (dispatch) => {
    const examSaved = await examService.updateExam(oldExam, newExam);
    dispatch(examSlice.actions.updateExam(examSaved));
  };
};
export const getDetailExamByExamId = (examId, stateId, licenseId) => {
  return async (dispatch) => {
    const exam = await examService.getExamByExamId(examId, stateId, licenseId);
    return exam;
  };
};

export default examSlice.reducer;
