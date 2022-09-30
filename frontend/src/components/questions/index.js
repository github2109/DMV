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
import { connect } from "react-redux";
import "./style.css";
import { useEffect } from "react";

const Questions = ({
  moduleId,
  questions,
  isApceptImport,
  handleSaveModalDetailQuestion,
  handleRemoveQuestion,
  isTestQuestion,
  ...props
}) => {
  const [question, setQuestion] = useState(null);
  const [questionsView, setQuestionsView] = useState(questions);
  const [modalDetailQuestion, setModalDetailQuestion] = useState(false);
  const [modalImportQuestion, setModalImportQuestion] = useState(false);
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
      props.onLoading();
      let promises = [];
      data.forEach((question) => {
        promises.push(props.createQuestion(question));
      });
      Promise.all([...promises]).then(() => {
        toggleModalImportQuestion();
        props.offLoading();
      });
    } catch (error) {
      props.offLoading();
      props.setErrorNotification(error.response.data.message);
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

const mapDispatchToProps = (dispatch) => {
  return {
    createQuestion: (question) => dispatch(createQuestion(question)),
    onLoading: () => dispatch(onLoading()),
    offLoading: () => dispatch(offLoading()),
    setSuccessNotification: (mess) => dispatch(setSuccessNotification(mess)),
    setErrorNotification: (mess) => dispatch(setErrorNotification(mess)),
  };
};

export default connect(null, mapDispatchToProps)(Questions);
