/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./style.css";
import { getDetailModuleByModuleId } from "../../../reducers/moduleReducer";
import ModalQuestion from "../ModalQuestion";
import {
  onLoading,
  offLoading,
  setErrorNotification,
} from "../../../reducers/responseUIReducer";
const ModalModule = ({
  modal,
  toggle,
  moduleId,
  handleSaveModal,
  ...props
}) => {
  const [oldModule, setOldModule] = useState(null);
  const [tmpModule, setTmpModule] = useState(null);
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
        imageDescription: null,
        isPremium: false,
      });
    } else {
      if (props.module) {
        setTmpModule(props.module);
        setIsCreated(false);
        setOldModule(props.module);
      } else {
        try {
          props.onLoading();
          props.getDetailModuleByModuleId(moduleId).then((res) => {
            setTmpModule(res);
            setIsCreated(false);
            setOldModule(res);
            props.offLoading();
          });
        } catch (error) {
          props.offLoading();
          props.setErrorNotification(error.response.data.message);
        }
      }
    }
  }, [modal]);
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setTmpModule({
      ...tmpModule,
      imageDescription: file,
    });
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
  const handleBeforeSaveModal = async (oldModule, tmpModule, isCreated) => {
    if (tmpModule.imageDescription === null) {
      props.setErrorNotification("Please import image description  !!");
      return;
    }
    if (
      tmpModule.name === "" ||
      tmpModule.titleDescription === "" ||
      tmpModule.contentDescription === ""
    ) {
      props.setErrorNotification("Please filling enough data !!");
      return;
    }
    const module = await handleSaveModal(oldModule, tmpModule, isCreated);
    if (!module) return;
    if (isCreated) {
      setTmpModule(module);
      setOldModule(module);
      toggleChildren();
      setIsCreated(false);
    } else {
      toggle();
    }
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
  if (!tmpModule) return null;
  return (
    <Modal isOpen={modal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Detail module</ModalHeader>
      <ModalBody>
        {props.toggleModalImportModule && isCreated && (
          <div className="import-container">
            <div className="import-file-icon">
              <i
                className="fa-solid fa-upload"
                onClick={(e) => {
                  toggle();
                  props.toggleModalImportModule();
                }}
              ></i>
            </div>
            <span>Import data</span>
          </div>
        )}
        {modalChildren === true && (
          <ModalQuestion
            modal={modalChildren}
            toggle={toggleChildren}
            moduleId={tmpModule._id}
          />
        )}
        <div className="module-modal-container">
          <div className="module-form">
            <label>Module name :</label>
            <div
              className="wrap-input validate-input"
              data-validate="Module name is required"
            >
              <input
                name="name"
                className="input-text-module"
                type="text"
                placeholder="module name"
                value={tmpModule && tmpModule.name}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onChange={handleInputChange}
              />
            </div>
            <label>Title description :</label>
            <div
              className="wrap-input validate-input"
              data-validate="Title description is required"
            >
              <input
                name="titleDescription"
                className="input-text-module"
                type="text"
                placeholder="Title description"
                onBlur={handleBlur}
                onFocus={handleFocus}
                value={tmpModule && tmpModule.titleDescription}
                onChange={handleInputChange}
              />
            </div>
            <label>Content description :</label>
            <div
              className="wrap-input validate-input"
              data-validate="Content description is required"
            >
              <textarea
                name="contentDescription"
                className="input-text-module content-description"
                type="text"
                placeholder="Content description"
                value={tmpModule && tmpModule.contentDescription}
                onChange={handleInputChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
              />
            </div>
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
                  {tmpModule && tmpModule.imageDescription !== null ? (
                    <img
                      src={
                        typeof tmpModule.imageDescription === "object"
                          ? URL.createObjectURL(tmpModule.imageDescription)
                          : tmpModule.imageDescription
                      }
                      alt=""
                      className="image-module"
                    ></img>
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
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={(e) =>
            handleBeforeSaveModal(oldModule, tmpModule, isCreated)
          }
        >
          {isCreated ? "Next" : "Save"}
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
    onLoading: () => dispatch(onLoading()),
    offLoading: () => dispatch(offLoading()),
    setErrorNotification: (mess) => dispatch(setErrorNotification(mess)),
  };
};

const mapStateToProps = (state) => {
  return {
    modules: state.modules,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalModule);
