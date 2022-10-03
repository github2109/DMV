/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useEffect, useState } from "react";
import "./style.css";
import { connect } from "react-redux";
import { setErrorNotification } from "../../../reducers/responseUIReducer";
const ModalLicense = ({
  modal,
  toggle,
  license,
  handleSaveModel,
  ...props
}) => {
  const [tmpLicense, setTmpLicense] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isCreated, setIsCreated] = useState(false);
  useEffect(() => {
    if (license === null) {
      setIsCreated(true);
      setTmpLicense({
        name: "",
        image: null,
        description: "",
      });
    } else {
      setTmpLicense(license);
      setImageUrl(license.image);
      setIsCreated(false);
    }
  }, [modal]);
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setTmpLicense({
      ...tmpLicense,
      image: file,
    });
    setImageUrl(URL.createObjectURL(file));
  };
  const handleInputChange = (e) => {
    setTmpLicense({
      ...tmpLicense,
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
  const handleBeforeSaveModal = (license, tmpLicense, isCreated) => {
    if(tmpLicense.image === null){
      props.setErrorNotification("Please import license image !!");
      return;
    }
    if (tmpLicense.name === "" || tmpLicense.description === "") {
      props.setErrorNotification("Please filling enough information !!");
      return;
    }
  };
  return (
    <Modal isOpen={modal} toggle={toggle} size="md" className="modal-license">
      <ModalHeader toggle={toggle}>License</ModalHeader>
      <ModalBody>
        <div className="license-modal-container">
          <div className="license-form">
            <div
              className="wrap-input validate-input"
              data-validate="License name is required"
            >
              <input
                name="name"
                className="input-text-license"
                type="text"
                placeholder="License name"
                value={tmpLicense && tmpLicense.name}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onChange={handleInputChange}
              />
            </div>
            <div
              className="wrap-input validate-input"
              data-validate="License description is required"
            >
              <input
                name="description"
                className="input-text-license"
                type="text"
                placeholder="License description"
                value={tmpLicense && tmpLicense.description}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onChange={handleInputChange}
              />
            </div>
            <div className="image-upload">
              <div className="image-edit">
                <input type="file" id="imageUpload" onChange={onImageChange} />
                <label htmlFor="imageUpload"></label>
              </div>
              <div className="image-preview">
                <div id="imagePreview">
                  {tmpLicense && tmpLicense.image !== null ? (
                    <img src={imageUrl} alt="" className="image-license"></img>
                  ) : (
                    <span className="import-text">Import image</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={(e) => handleBeforeSaveModal(license, tmpLicense, isCreated)}
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

export default connect(null, mapDispatchToProps)(ModalLicense);
