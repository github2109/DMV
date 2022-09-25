/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from "react-redux";
import { setModuleByLicenseId } from "../../reducers/moduleReducer";
import { useEffect, useState } from "react";
import DrawModules from "../../components/modules/draw";
import Select from "../../components/select";
import { initializeLicense } from "../../reducers/licenseReducer";
import {
  onLoading,
  offLoading,
  setSuccessNotification,
  setErrorNotification,
} from "../../reducers/responseUIReducer";
import {
  savePositionModule,
  updateModule,
  createModule,
  deleteModule,
} from "../../reducers/moduleReducer";
import "./style.css";
import CustomButton from "../../components/button/CustomButton";
import PlusButton from "../../components/button/PlusButton";
import ModalModule from "../../components/modal/ModalModule";
import ModalQuestion from "../../components/modal/ModalQuestion";
const ModuleByLicense = (props) => {
  const [licenseId, setLicenseId] = useState(null);
  useEffect(() => {
    props.initializeLicense();
  }, []);
  useEffect(() => {
    if (licenseId) {
      props.onLoading();
      props.setModuleByLicenseId(licenseId).then((res) => props.offLoading());
    }
  }, [licenseId]);
  const [modalModule, setModalModule] = useState(false);
  const [modalQuestion, setModalQuestion] = useState(false);
  const [moduleId, setModuleId] = useState(null);
  const toggleModule = () => setModalModule(!modalModule);
  const toggleQuestion = () => setModalQuestion(!modalQuestion);
  const handleSavePositionClick = () => {
    try {
      props.onLoading();
      props.savePositionModule(props.modules).then((res) => {
        props.offLoading();
        props.setSuccessNotification(
          "Position of licenses was updated successfully"
        );
      });
    } catch (error) {
      props.offLoading();
      props.setErrorNotification(error.response.data.message);
    }
  };
  const handleClickCreateModule = () => {
    setModuleId(null);
    toggleModule();
  };
  const handleSaveModal = async (oldModule, newModule, isCreate) => {
    try {
      props.onLoading();
      if (isCreate) {
        newModule.license = licenseId;
        newModule.position = props.modules.length + 1;
        const newModuleSaved = await props.createModule(newModule);
        props.setSuccessNotification("Module created successfully");
        return newModuleSaved;
      } else {
        await props.updateModule(oldModule, newModule);
        props.setSuccessNotification("Module updated successfully");
      }
      props.offLoading();
      toggleModule();
    } catch (error) {
      props.offLoading();
      props.setErrorNotification(error.response.data.message);
    }
  };
  const handleSelectModule = (e, moduleId) => {
    e.stopPropagation();
    setModuleId(moduleId);
  };
  const handleEditModule = (e, moduleId) => {
    e.stopPropagation();
    setModuleId(moduleId);
    toggleModule();
  };
  const handleDeleteModule = (e, moduleId) => {
    e.stopPropagation();
    try {
      props.onLoading();
      props.deleteModule(moduleId).then((res) => {
        props.offLoading();
        props.setSuccessNotification("Module removed successfully");
      });
    } catch (error) {
      props.offLoading();
      props.setErrorNotification(error.response.data.message);
    }
  };
  return (
    <div className="container">
      {modalModule && <ModalModule
        modal={modalModule}
        toggle={toggleModule}
        moduleId={moduleId}
        handleSaveModal={handleSaveModal}
      />}
      {modalQuestion && <ModalQuestion
        modal={modalQuestion}
        toggle={toggleQuestion}
        moduleId={moduleId}
      />}
      <div className="select2-container">
        {moduleId && (
          <CustomButton
            className="manage-question-button"
            labelName="Manage questions"
            handleClick={toggleQuestion}
          />
        )}
        <Select
          listData={props.licenses}
          className="licenses-style"
          nameSelect="license"
          item={licenseId}
          setItem={setLicenseId}
        />
        <CustomButton
          className="save-button"
          labelName="Save"
          handleClick={handleSavePositionClick}
        />
      </div>
      <div className="modules-container">
        {licenseId && (
          <DrawModules
            moduleIdSelected={moduleId}
            handleEditModule={handleEditModule}
            handleSelectModule={handleSelectModule}
            handleDeleteModule={handleDeleteModule}
          />
        )}
        {licenseId && (
          <div className="create-module-into-license">
            <PlusButton handleClick={handleClickCreateModule} />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    licenses: state.licenses,
    modules: state.modules,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setModuleByLicenseId: (licenseId) =>
      dispatch(setModuleByLicenseId(licenseId)),

    initializeLicense: () => {
      dispatch(initializeLicense());
    },
    savePositionModule: (modules) => dispatch(savePositionModule(modules)),
    updateModule: (oldModule, newModule) =>
      dispatch(updateModule(oldModule, newModule)),
    createModule: (newModule) => dispatch(createModule(newModule)),
    deleteModule: (moduleId) => dispatch(deleteModule(moduleId)),
    onLoading: () => dispatch(onLoading()),
    offLoading: () => dispatch(offLoading()),
    setSuccessNotification: (mess) => dispatch(setSuccessNotification(mess)),
    setErrorNotification: (mess) => dispatch(setErrorNotification(mess)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModuleByLicense);
