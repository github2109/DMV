/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ModalBody, ModalFooter, ModalHeader, Modal, Button } from "reactstrap";
import { useState } from "react";
import {
  onLoading,
  offLoading,
  setErrorNotification,
} from "../../../reducers/responseUIReducer";
import { getDetailExamByExamId } from "../../../reducers/examReducer";
import "./style.css";
const ExamModal = ({
  modal,
  toggle,
  currentExam,
  handleSaveModal,
  stateId,
  licenseId,
}) => {
  const [tempExam, setTempExam] = useState(null);
  const [isCreated, setIsCreated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentExam === null) {
      setIsCreated(true);
      setTempExam({
        name: "",
        timeOfExam: "",
        numberOfQuestion: "",
      });
    } else {
      try {
        dispatch(onLoading());
        dispatch(
          getDetailExamByExamId(currentExam._id, stateId, licenseId)
        ).then((res) => {
          setTempExam(res);
          setIsCreated(false);
          dispatch(offLoading());
        });
      } catch (error) {
        dispatch(offLoading());
        dispatch(setErrorNotification(error.response.data.message));
      }
    }
  }, [modal]);
  const handleInputChange = (e) => {
    setTempExam({
      ...tempExam,
      [e.target.name]: e.target.value,
    });
  };
  const handleBlur = (event) => {
    if (event.target.value === "") {
      event.target.parentElement.classList.add("alert-validate");
      event.target.parentElement.classList.add("border-red");
    }
  };
  const handleFocus = (event) => {
    event.target.parentElement.classList.remove("alert-validate");
    event.target.parentElement.classList.remove("border-red");
  };
  const handleBeforeSaveModal = (currentExam, tempExam, isCreated) => {
    if (
      tempExam.name.trim() === "" ||
      tempExam.timeOfExam.trim() === "" ||
      tempExam.numberOfQuestion.trim() === ""
    ) {
      dispatch(setErrorNotification("Please fill enough information !!"));
      return;
    }
    handleSaveModal(currentExam, tempExam, isCreated);
  };
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={() => toggle()}>Exam</ModalHeader>
      <ModalBody>
        <div className="exam-modal-container">
          <div className="exam-form">
            <label>Exam's name :</label>
            <div
              className="wrap-input validate-input"
              data-validate="Exam name is required"
            >
              <input
                name="name"
                className="input-text-exam"
                type="text"
                placeholder="Exam's name"
                value={tempExam && tempExam.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
              />
            </div>
            <label>Number of question :</label>
            <div
              className="wrap-input validate-input"
              data-validate="Exam name is required"
            >
              <input
                name="numberOfQuestion"
                className="input-text-exam"
                type="text"
                placeholder="Number of question"
                value={tempExam && tempExam.numberOfQuestion}
                onChange={handleInputChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
              />
            </div>
            <label>Time of exam(minute) :</label>
            <div
              className="wrap-input validate-input"
              data-validate="Exam name is required"
            >
              <input
                name="timeOfExam"
                className="input-text-exam"
                type="text"
                placeholder="Time of exam"
                value={tempExam && tempExam.timeOfExam}
                onChange={handleInputChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
              />
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          className="px-3"
          onClick={(event) =>
            handleBeforeSaveModal(currentExam, tempExam, isCreated)
          }
        >
          {" "}
          Save
        </Button>{" "}
        <Button color="secondary" className="px-3" onClick={() => toggle()}>
          {" "}
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ExamModal;
