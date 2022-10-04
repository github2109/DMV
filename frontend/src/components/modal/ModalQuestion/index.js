/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateQuestion,
  createQuestion,
  deleteQuestion,
} from "../../../reducers/questionReducer";
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
const ModalQuestion = ({ modal, toggle, moduleId }) => {
  const [isTestQuestion, setIsTestQuestion] = useState(false);
  const questions = useSelector((state) => state.questions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onLoading());
    try {
      dispatch(setQuestionByModuleId(moduleId)).then((res) => {
        dispatch(offLoading());
      });
    } catch (error) {
      dispatch(offLoading());
      dispatch(setErrorNotification(error.response.data.message));
    }
  }, [moduleId]);
  const handleSaveModalDetailQuestion = async (
    oldQuestion,
    newQuestion,
    isCreate
  ) => {
    try {
      dispatch(onLoading());
      if (isCreate) {
        newQuestion.module = moduleId;
        await dispatch(createQuestion(newQuestion));
        dispatch(setSuccessNotification("Question created successfully"));
      } else {
        await dispatch(updateQuestion(oldQuestion, newQuestion));
        dispatch(setSuccessNotification("Question updated successfully"));
      }
      dispatch(offLoading());
    } catch (error) {
      dispatch(offLoading());
      dispatch(setErrorNotification(error.response.data.message));
    }
  };
  const handleRemoveQuestion = async (e, question) => {
    e.stopPropagation();
    try {
      dispatch(onLoading());
      await dispatch(deleteQuestion(question));
      dispatch(offLoading());
      dispatch(setSuccessNotification("Question deleted successfully"));
    } catch (error) {
      dispatch(offLoading());
      dispatch(setErrorNotification(error.response.data.message));
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
          questions={questions}
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

export default ModalQuestion;
