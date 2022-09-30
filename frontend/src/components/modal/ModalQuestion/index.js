/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useState } from "react";
import { connect } from "react-redux";
import {
  updateQuestion,
  createQuestion,
  deleteQuestion,
} from "../../../reducers/questionReducer"
import { setQuestionByModuleId } from "../../../reducers/questionReducer";
import {
  onLoading,
  offLoading,
  setSuccessNotification,
  setErrorNotification,
} from "../../../reducers/responseUIReducer";
import CustomButton from "../../button/CustomButton";
import "./style.css";
import { useEffect } from "react";
import Questions from "../../questions";
const ModalQuestion = ({ modal, toggle, moduleId, ...props }) => {
  const [isTestQuestion, setIsTestQuestion] = useState(false);

  useEffect(() => {
    props.onLoading();
    try {
      props.setQuestionByModuleId(moduleId).then((res) => {
        props.offLoading();
      });
    } catch (error) {
      props.offLoading();
      props.setErrorNotification(error.response.data.message);
    }
  }, [moduleId]);
  const handleSaveModalDetailQuestion = async (
    oldQuestion,
    newQuestion,
    isCreate
  ) => {
    try {
      props.onLoading();
      if (isCreate) {
        newQuestion.module = moduleId;
        await props.createQuestion(newQuestion);
        props.setSuccessNotification("Question created successfully");
      } else {
        await props.updateQuestion(oldQuestion, newQuestion);
        props.setSuccessNotification("Question updated successfully");
      }
      props.offLoading();
    } catch (error) {
      props.offLoading();
      props.setErrorNotification(error.response.data.message);
    }
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
  const handleClickFilterQuestionButton = () => {
    setIsTestQuestion(!isTestQuestion);
  };
  return (
    <Modal isOpen={modal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Question</ModalHeader>
      <ModalBody>
        <CustomButton
          className="filter-question-button"
          labelName={
            isTestQuestion ? "Show learning questions" : "Show test questions"
          }
          handleClick={handleClickFilterQuestionButton}
        />
        <Questions
          questions={props.questions}
          moduleId={moduleId}
          handleSaveModalDetailQuestion={handleSaveModalDetailQuestion}
          handleRemoveQuestion={handleRemoveQuestion}
          isApceptImport={true}
          isTestQuestion={isTestQuestion}
        />
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
    updateQuestion: (oldQuestion, newQuestion) =>
      dispatch(updateQuestion(oldQuestion, newQuestion)),
    deleteQuestion: (question) => dispatch(deleteQuestion(question)),
    createQuestion: (question) =>
      dispatch(createQuestion(question)),
    setQuestionByModuleId: (moduleId) =>
      dispatch(setQuestionByModuleId(moduleId)),
    onLoading: () => dispatch(onLoading()),
    offLoading: () => dispatch(offLoading()),
    setSuccessNotification: (mess) => dispatch(setSuccessNotification(mess)),
    setErrorNotification: (mess) => dispatch(setErrorNotification(mess)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalQuestion);
