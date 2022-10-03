/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useState, useEffect } from "react";
import PlusButton from "../../button/PlusButton";
import "./style.css";
import { connect } from "react-redux";
import { setErrorNotification } from "../../../reducers/responseUIReducer";
const ModalDetailQuestion = ({
  modal,
  toggle,
  question,
  handleSaveModal,
  toggleModalImportQuestion,
  ...props
}) => {
  const [oldQuestion, setOldQuestion] = useState(null);
  const [tmpQuestion, setTmpQuestion] = useState(null);
  const [isCreated, setIsCreated] = useState(false);
  useEffect(() => {
    if (question === null) {
      setIsCreated(true);
      setTmpQuestion({
        questionContent: "",
        answers: [],
        isTestQuestion: false,
        image: null,
        handBook: "",
      });
    } else {
      setOldQuestion(question);
      setTmpQuestion(question);
    }
  }, [modal]);
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setTmpQuestion({
      ...tmpQuestion,
      image: file,
    });
  };
  const handleClickAddAnswer = () => {
    setTmpQuestion({
      ...tmpQuestion,
      answers: [
        ...tmpQuestion.answers,
        {
          content: "",
          isCorrect: false,
        },
      ],
    });
  };
  const handleInputChange = (e) => {
    setTmpQuestion({
      ...tmpQuestion,
      [e.target.name]: e.target.value,
    });
  };
  const handleInputAnswerChange = (e, i) => {
    let answers = [...tmpQuestion.answers];
    answers[i] = {
      ...answers[i],
      content: e.target.value,
    };
    setTmpQuestion({
      ...tmpQuestion,
      answers: answers,
    });
  };
  const handleCheckRadioButtonAnswer = (e, i) => {
    let answers = tmpQuestion.answers;
    answers[i].isCorrect = e.target.value === "true" ? true : false;
    setTmpQuestion({
      ...tmpQuestion,
      answers: answers,
    });
  };
  const handleCheckRadioButtonIsTestQuestion = (e) => {
    const value = e.target.value === "true" ? true : false;
    setTmpQuestion({
      ...tmpQuestion,
      isTestQuestion: value,
      handBook: value ? null : "",
    });
  };
  const handleRemoveAnswer = (i) => {
    let answers = [...tmpQuestion.answers];
    answers.splice(i, 1);
    setTmpQuestion({
      ...tmpQuestion,
      answers: answers,
    });
  };
  const handleRemoveImage = () => {
    setTmpQuestion({
      ...tmpQuestion,
      image: null,
    });
  };
  if (tmpQuestion === null) return null;
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
  const handleBeforeSaveModal = (oldQuestion, tmpQuestion, isCreated) => {
    if (tmpQuestion.answers.length === 0) {
      props.setErrorNotification("Please add answers !!");
      return;
    }
    if (
      tmpQuestion.questionContent === "" ||
      (tmpQuestion.handBook === "" && !tmpQuestion.isTestQuestion)
    ) {
      props.setErrorNotification("Please filling enough information !!");
      return;
    }
    handleSaveModal(oldQuestion, tmpQuestion, isCreated);
    toggle();
  };
  return (
    <Modal isOpen={modal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Detail Question</ModalHeader>
      <ModalBody>
        {toggleModalImportQuestion && isCreated && (
          <div className="import-container">
            <div className="import-file-icon">
              <i
                className="fa-solid fa-upload"
                onClick={(e) => {
                  toggle();
                  toggleModalImportQuestion();
                }}
              ></i>
            </div>
            <span>Import data</span>
          </div>
        )}
        <div className="form-question">
          <label>Content question :</label>
          <div
            className="wrap-input validate-input"
            data-validate="Question content is required"
          >
            <textarea
              name="questionContent"
              className="input-text-question"
              type="text"
              placeholder="Content question"
              value={tmpQuestion.questionContent}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onChange={handleInputChange}
            />
          </div>
          <label>Image :</label>
          <div className="image-upload-question">
            <div className="image-edit-question">
              <input
                type="file"
                id="imageUpload-question"
                onChange={onImageChange}
                key={tmpQuestion.image}
              />
              <label htmlFor="imageUpload-question"></label>
            </div>
            <div className="image-preview-question">
              <div id="imagePreview-question">
                {tmpQuestion.image !== null ? (
                  <img
                    src={
                      typeof tmpQuestion.image === "object"
                        ? URL.createObjectURL(tmpQuestion.image)
                        : tmpQuestion.image
                    }
                    alt=""
                    className="image-question"
                  ></img>
                ) : (
                  <span className="import-text-question">Import image</span>
                )}
              </div>
            </div>
            <div className="image-remove-question" onClick={handleRemoveImage}>
              <i className="icon-x fa-solid fa-x"></i>
            </div>
          </div>

          <label>Answers :</label>
          <div className="answers-container">
            {tmpQuestion.answers.map((answer, i) => (
              <div key={i}>
                <span>Answer {i + 1} : </span>
                <input
                  name={`answers[${i}]`}
                  className="input-text-answer"
                  type="text"
                  placeholder="Content"
                  value={tmpQuestion.answers[i].content}
                  onChange={(e) => handleInputAnswerChange(e, i)}
                />
                <div
                  className="button-remove-answer"
                  onClick={(e) => handleRemoveAnswer(i)}
                >
                  <i className="trash-icon fa-solid fa-trash"></i>
                </div>
                <div
                  className="radio-group-module"
                  onChange={(e) => handleCheckRadioButtonAnswer(e, i)}
                >
                  <input
                    type="radio"
                    value="true"
                    name={`answer${i}`}
                    defaultChecked={answer.isCorrect === true}
                  />{" "}
                  True
                  <input
                    type="radio"
                    value="false"
                    name={`answer${i}`}
                    className="radio-module"
                    defaultChecked={answer.isCorrect === false}
                  />{" "}
                  False
                </div>
              </div>
            ))}
            <div className="add-answer-button">
              <PlusButton handleClick={handleClickAddAnswer} />
            </div>
          </div>
          <div
            className="radio-group-module"
            onChange={handleCheckRadioButtonIsTestQuestion}
          >
            <input
              type="radio"
              value="true"
              name="isTestQuestion"
              defaultChecked={tmpQuestion.isTestQuestion === true}
            />{" "}
            Test question
            <input
              type="radio"
              value="false"
              name="isTestQuestion"
              className="radio-module"
              defaultChecked={tmpQuestion.isTestQuestion === false}
            />{" "}
            Learning question
          </div>
          {tmpQuestion.isTestQuestion === false && (
            <div className="handBook-container">
              <label>Handbook :</label>
              <div
                className="wrap-input validate-input"
                data-validate="Handbook is required"
              >
                <textarea
                  name="handBook"
                  className="input-text-question"
                  type="text"
                  placeholder="Handbook"
                  value={tmpQuestion.handBook}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={(e) => {
            handleBeforeSaveModal(oldQuestion, tmpQuestion, isCreated);
          }}
        >
          Save
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setErrorNotification: (mess) => dispatch(setErrorNotification(mess)),
  };
};

export default connect(null, mapDispatchToProps)(ModalDetailQuestion);
