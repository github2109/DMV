import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./style.css";
import { getDetailModuleByModuleId } from "../../../reducers/moduleReducer";
import CustomButton from "../../button/CustomButton";
import ModalQuestion from "../ModalQuestion"
const ModalModule = ({
  modal,
  toggle,
  moduleId,
  handleSaveModel,
  ...props
}) => {
  const [oldModule, setOldModule] = useState(null);
  const [tmpModule, setTmpModule] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isCreated, setIsCreated] = useState(false);
  const [modalChildren, setModalChildren] = useState(false);
  const toggleChildren = () => setModalChildren(!modalChildren);
  useEffect(() => {
    if (moduleId === null) {
      setIsCreated(true);
      setTmpModule({
        name: "",
        titleDescription: "",
        contentDescription: "",
        imageDescription: "",
        isPremium: false,
      });
    } else {
      props.getDetailModuleByModuleId(moduleId).then((res) => {
        setTmpModule(res);
        setImageUrl(res.imageDescription);
        setIsCreated(false);
        setOldModule(res);
      });
    }
  }, [modal]);
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setTmpModule({
      ...tmpModule,
      image: file,
    });
    setImageUrl(URL.createObjectURL(file));
  };
  const handleInputChange = (e) => {
    setTmpModule({
      ...tmpModule,
      [e.target.name]: e.target.value,
    });
  };
  const handleCheckRadioButton = (e) => {
    setTmpModule({
      ...tmpModule,
      isPremium: e.target.value === "true" ? true : false,
    });
  };
  return (
    <Modal isOpen={modal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Detail module</ModalHeader>
      <ModalBody>
        <ModalQuestion modal={modalChildren} toggle={toggleChildren} moduleId={moduleId} />
        <div className="module-modal-container">
          <div className="module-form">
            <label>Module name :</label>
            <input
              name="name"
              className="input-text-module"
              type="text"
              placeholder="module name"
              value={tmpModule && tmpModule.name}
              onChange={handleInputChange}
            />
            <label>Title description :</label>
            <input
              name="titleDescription"
              className="input-text-module"
              type="text"
              placeholder="Title description"
              value={tmpModule && tmpModule.titleDescription}
              onChange={handleInputChange}
            />
            <label>Content description :</label>
            <textarea
              name="contentDescription"
              className="input-text-module content-description"
              type="text"
              placeholder="Content description"
              value={tmpModule && tmpModule.contentDescription}
              onChange={handleInputChange}
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
                  {tmpModule && tmpModule.image !== "" ? (
                    <img src={imageUrl} alt="" className="image-module"></img>
                  ) : (
                    <span className="import-text-module">Import image</span>
                  )}
                </div>
              </div>
            </div>
            <div
              className="radio-group-module"
              onChange={handleCheckRadioButton}
            >
              <input
                type="radio"
                value="true"
                name="isPremium"
                defaultChecked={tmpModule && tmpModule.isPremium === true}
              />{" "}
              Premium
              <input
                type="radio"
                value="false"
                name="isPremium"
                className="radio-module"
                defaultChecked={tmpModule && tmpModule.isPremium === false}
              />{" "}
              Basic
            </div>
            <CustomButton
              className="manage-question-button"
              labelName="Manage questions"
              handleClick={toggleChildren}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={(e) => handleSaveModel(oldModule, tmpModule, isCreated)}
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
    getDetailModuleByModuleId: (moduleId) =>
      dispatch(getDetailModuleByModuleId(moduleId)),
  };
};

export default connect(null, mapDispatchToProps)(ModalModule);
