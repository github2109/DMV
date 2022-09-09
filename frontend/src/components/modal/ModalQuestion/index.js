/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  setQuestionByModuleId,
  updateQuestion,
  deleteQuestion,
  createQuestion,
} from "../../../reducers/questionReducer";
import {
  onLoading,
  offLoading,
  setSuccessNotification,
  setErrorNotification,
} from "../../../reducers/responseUIReducer";
import ModalDetailQuestion from "../ModalDetailQuestion";
import PlusButton from "../../button/PlusButton";
import "./style.css";
const ModalLicense = ({ modal, toggle, moduleId, ...props }) => {
  const [question, setQuestion] = useState(null);
  const [modalChildren, setModalChildren] = useState(false);
  const toggleChildren = () => setModalChildren(!modalChildren);
  useEffect(() => {
    props.onLoading();
    try {
      props.setQuestionByModuleId(moduleId).then((res) => props.offLoading());
    } catch (error) {
      props.setErrorNotification(error.response.data.message);
    }
  }, []);
  const handleClickCreateQuestion = () => {
    setQuestion(null);
    toggleChildren();
  };
  const handleSaveModalDetailQuestion = async (
    oldQuestion,
    newQuestion,
    isCreate
  ) => {
    try {
      props.onLoading();
      if (isCreate) {
        await props.createQuestion(newQuestion, moduleId);
        props.setSuccessNotification("Question created successfully");
      } else {
        await props.updateQuestion(oldQuestion, newQuestion);
        props.setSuccessNotification("Question updated successfully");
      }
      props.offLoading();
      toggleChildren();
    } catch (error) {
      props.offLoading();
      props.setErrorNotification(error.response.data.message);
    }
  };
  const handleSelectQuestion = (question) => {
    setQuestion(question);
    toggleChildren();
  };
  const handleRemoveQuestion = async (e, question) => {
    e.stopPropagation();
    try {
      props.onLoading();
      await props.deleteQuestion(question);
      props.offLoading();
      props.setSuccessNotification("Question deleted successfully");
    } catch (error) {
      props.offLoading();
      props.setErrorNotification(error.response.data.message);
    }
  };
  return (
    <Modal isOpen={modal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Question</ModalHeader>
      <ModalBody>
        {modalChildren && (
          <ModalDetailQuestion
            modal={modalChildren}
            toggle={toggleChildren}
            question={question}
            handleSaveModal={handleSaveModalDetailQuestion}
          />
        )}
        <div className="modal-question-container">
          {props.questions.map((question, i) => (
            <div
              className="leaderboard-question"
              key={i}
              onClick={(e) => handleSelectQuestion(question)}
            >
              <span>
                {i + 1}. {question.questionContent}
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
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>
          Done
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    questions: state.questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setQuestionByModuleId: (moduleId) =>
      dispatch(setQuestionByModuleId(moduleId)),
    updateQuestion: (oldQuestion, newQuestion) =>
      dispatch(updateQuestion(oldQuestion, newQuestion)),
    deleteQuestion: (question) => dispatch(deleteQuestion(question)),
    createQuestion: (question, moduleId) =>
      dispatch(createQuestion(question, moduleId)),
    onLoading: () => dispatch(onLoading()),
    offLoading: () => dispatch(offLoading()),
    setSuccessNotification: (mess) => dispatch(setSuccessNotification(mess)),
    setErrorNotification: (mess) => dispatch(setErrorNotification(mess)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalLicense);
