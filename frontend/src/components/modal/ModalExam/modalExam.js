import React, { useEffect } from "react";
import { connect } from "react-redux";
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
  ...props
}) => {
  const [tempExam, setTempExam] = useState(null);
  const [isCreted, setIsCreted] = useState(false);
  useEffect(() => {
    if (currentExam === null) {
      setIsCreted(true);
      setTempExam({
        name: "",
        timeOfExam: "",
        numberOfQuestion: "",
      });
    } else {
      try {
        props.onLoading();
        props
          .getDetailExamByExamId(currentExam._id, stateId, licenseId)
          .then((res) => {
            setTempExam(res);
            setIsCreted(false);
            props.offLoading();
          });
      } catch (error) {
        props.offLoading();
        props.setErrorNotification(error.response.data.message);
      }
    }
  }, [modal]);
  const handleInputChange = (e) => {
    setTempExam({
      ...tempExam,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={() => toggle()}>Exam</ModalHeader>
      <ModalBody>
        <div className="exam-modal-container">
          <div className="exam-form">
            <label>Exam's name :</label>
            <input
              name="name"
              className="input-text-exam"
              type="text"
              placeholder="Exam's name"
              value={tempExam && tempExam.name}
              onChange={handleInputChange}
            />
            <label>Number of question :</label>
            <input
              name="numberOfQuestion"
              className="input-text-exam"
              type="text"
              placeholder="Number of question"
              value={tempExam && tempExam.numberOfQuestion}
              onChange={handleInputChange}
            />
            <label>Time of exam :</label>
            <input
              name="timeOfExam"
              className="input-text-exam"
              type="text"
              placeholder="Time of exam"
              value={tempExam && tempExam.timeOfExam}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          className="px-3"
          onClick={(event) => handleSaveModal(currentExam, tempExam, isCreted)}
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
const mapStateToProps = (state) => {
  return {
    exams: state.exams,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailExamByExamId: (examId, stateId, licenseId) =>
      dispatch(getDetailExamByExamId(examId, stateId, licenseId)),
    onLoading: () => dispatch(onLoading()),
    offLoading: () => dispatch(offLoading()),
    setErrorNotification: (mess) => dispatch(setErrorNotification(mess)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamModal);
