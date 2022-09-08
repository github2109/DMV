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
import ModalDetailQuestion from "../ModalDetailQuestion";
import PlusButton from "../../button/PlusButton";
import "./style.css";
const ModalLicense = ({ modal, toggle, moduleId, ...props }) => {
  const [question, setQuestion] = useState(null);
  const [modalChildren, setModalChildren] = useState(false);
  const toggleChildren = () => setModalChildren(!modalChildren);
  useEffect(() => {
    props.setQuestionByModuleId(moduleId);
  }, []);
  const handleClickCreateQuestion = () => {
    setQuestion(null);
    toggleChildren();
  }
  const handleSaveModalDetailQuestion = async (oldQuestion, newQuestion, isCreate) => {
    if (isCreate) {
      console.log(newQuestion)
      await props.createQuestion(newQuestion,moduleId);
    } else {
      await props.updateQuestion(oldQuestion, newQuestion);
    }
    toggleChildren();
  };
  const handleSelectQuestion = (question) => {
    setQuestion(question);
    toggleChildren();
  }
  const handleRemoveQuestion = async(e,question) => {
    e.stopPropagation();
    await props.deleteQuestion(question);
  }
  return (
    <Modal isOpen={modal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Question</ModalHeader>
      <ModalBody>
        {modalChildren && <ModalDetailQuestion modal={modalChildren} toggle={toggleChildren} question={question} handleSaveModal={handleSaveModalDetailQuestion}/>}
        <div className="modal-question-container">
          {props.questions.map((question, i) => (
            <div className="leaderboard-question" key={i} onClick={(e) => handleSelectQuestion(question)}>
              <span>
                {i + 1}. {question.questionContent}
              </span>
              <div className="TrashButton-modal-question" onClick={(e) => handleRemoveQuestion(e,question)}>
                <i className="trash-icon fa-solid fa-trash"></i>
              </div>
            </div>
          ))}
          <div className="create-modal-question">
            <PlusButton handleClick={handleClickCreateQuestion}/>
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
    updateQuestion: (oldQuestion,newQuestion) => dispatch(updateQuestion(oldQuestion,newQuestion)),
    deleteQuestion: (question) => dispatch(deleteQuestion(question)),
    createQuestion: (question,moduleId) => dispatch(createQuestion(question,moduleId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalLicense);
