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
import PlusButton from "../../button/PlusButton";
import "./style.css";
const ModalLicense = ({ modal, toggle, moduleId, ...props }) => {
  const [question, setQuestion] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    props.setQuestionByModuleId(moduleId);
  }, []);
  const onImageChange = (e) => {};
  return (
    <Modal isOpen={modal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Question</ModalHeader>
      <ModalBody>
        <div className="modal-question-container">
          {props.questions.map((question, i) => (
            <div className="leaderboard-question" key={i}>
              <span>
                {i + 1}. {question.questionContent}
              </span>
              <div className="TrashButton-modal-question">
                <i className="trash-icon fa-solid fa-trash"></i>
              </div>
            </div>
          ))}
          <div className="create-modal-question">
            <PlusButton />
          </div>
          <div className="form-question">
            <label>Content question :</label>
            <input
              name="contentQuestion"
              className="input-text-module"
              type="text"
              placeholder="Title description"
            />
            <label>Image description :</label>
            <div className="image-upload-module">
              <div className="image-edit-module">
                <input
                  type="file"
                  id="imageUpload-module"
                  onChange={onImageChange}
                />
                <label htmlFor="imageUpload-module"></label>
              </div>
              <div className="image-preview-module">
                <div id="imagePreview-module">
                  {question && question.image !== "" ? (
                    <img src={imageUrl} alt="" className="image-module"></img>
                  ) : (
                    <span className="import-text-module">Import image</span>
                  )}
                </div>
              </div>
            </div>
            <label>Content question :</label>
            <input
              name="contentQuestion"
              className="input-text-module"
              type="text"
              placeholder="Title description"
            />
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
    updateQuestion: (question) => dispatch(updateQuestion(question)),
    deleteModule: (question) => dispatch(deleteQuestion(question)),
    createQuestion: (question) => dispatch(createQuestion(question)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalLicense);
