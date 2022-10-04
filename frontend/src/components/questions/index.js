/* eslint-disable react-hooks/exhaustive-deps */
import PlusButton from "../button/PlusButton";
import { useState } from "react";
import ModalDetailQuestion from "../modal/ModalDetailQuestion";
import {
  onLoading,
  offLoading,
  setSuccessNotification,
  setErrorNotification,
} from "../../reducers/responseUIReducer";
import { createQuestion } from "../../reducers/questionReducer";
import ModalImport from "../modal/ModalImport";
import { useDispatch } from "react-redux";
import "./style.css";
import { useEffect } from "react";

const Questions = ({
  moduleId,
  questions,
  isApceptImport,
  handleSaveModalDetailQuestion,
  handleRemoveQuestion,
  isTestQuestion,
}) => {
  const [question, setQuestion] = useState(null);
  const [questionsView, setQuestionsView] = useState(questions);
  const [modalDetailQuestion, setModalDetailQuestion] = useState(false);
  const [modalImportQuestion, setModalImportQuestion] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isTestQuestion === undefined) setQuestionsView(questions);
    else
      setQuestionsView(
        questions.filter(
          (question) => question.isTestQuestion === isTestQuestion
        )
      );
  }, [questions, isTestQuestion]);

  const toggleModalDetailQuestion = () =>
    setModalDetailQuestion(!modalDetailQuestion);
  const toggleModalImportQuestion = () =>
    setModalImportQuestion(!modalImportQuestion);

  const handleSelectQuestion = (question) => {
    setQuestion(question);
    toggleModalDetailQuestion();
  };
  const handleClickCreateQuestion = () => {
    setQuestion(null);
    toggleModalDetailQuestion();
  };
  const handleSaveModalImport = (data) => {
    try {
      dispatch(onLoading());
      let promises = [];
      data.forEach((question) => {
        promises.push(dispatch(createQuestion(question)));
      });
      Promise.all([...promises]).then(() => {
        toggleModalImportQuestion();
        dispatch(offLoading());
        dispatch(setSuccessNotification("Import successfully"))
      });
    } catch (error) {
      dispatch(offLoading());
      dispatch(setErrorNotification(error.response.data.message));
    }
  };
  return (
    <div className="modal-question-container">
      {isApceptImport && (
        <ModalImport
          moduleId={moduleId}
          modal={modalImportQuestion}
          toggle={toggleModalImportQuestion}
          componentImport="question"
          toggleModalDetail={toggleModalDetailQuestion}
          handleSaveModal={handleSaveModalImport}
        />
      )}
      {modalDetailQuestion && (
        <ModalDetailQuestion
          modal={modalDetailQuestion}
          toggle={toggleModalDetailQuestion}
          question={question}
          handleSaveModal={handleSaveModalDetailQuestion}
          moduleId={moduleId}
          toggleModalImportQuestion={
            isApceptImport && toggleModalImportQuestion
          }
        />
      )}
      {questionsView.map((question, i) => (
        <div
          className="leaderboard-question"
          key={i}
          onClick={(e) => handleSelectQuestion(question)}
        >
          <span>
            {i + 1}.{" "}
            {question.questionContent.length > 100
              ? question.questionContent.slice(0, 100) + "...."
              : question.questionContent}
          </span>
          <div
            className="TrashButton-modal-question"
            onClick={(e) => handleRemoveQuestion(e, question)}
          >
            <i className="trash-icon fa-solid fa-trash"></i>
          </div>
        </div>
      ))}
      <div className="create-modal-question">
        <PlusButton handleClick={handleClickCreateQuestion} />
      </div>
    </div>
  );
};

export default Questions;
