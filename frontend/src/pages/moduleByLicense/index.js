/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from "react-redux";
import { setModuleByLicenseId } from "../../reducers/moduleReducer";
import { useEffect, useState } from "react";
import DrawModules from "../../components/modules/draw";
import Select from "../../components/select";
import { initializeLicense } from "../../reducers/licenseReducer";
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
const ModuleByLicense = (props) => {
  const [licenseId, setLicenseId] = useState(null);
  useEffect(() => {
    props.initializeLicense();
  }, []);
  useEffect(() => {
    if (licenseId) props.setModuleByLicenseId(licenseId);
  }, [licenseId]);
  const [modal, setModal] = useState(false);
  const [moduleId, setModuleId] = useState(null);
  const toggle = () => setModal(!modal);
  const handleSavePositionClick = () => {
    props.savePositionModule(props.modules);
  };
  const handleClickCreateModule = () => {
    setModuleId(null);
    toggle();
  };
  const handleSaveModel = async (oldModule, newModule, isCreate) => {
    if (isCreate) {
      newModule.licenseId = licenseId;
      await props.createModule(newModule);
    } else {
      await props.updateModule(oldModule, newModule);
    }
    toggle();
  };
  const handleSelectModule = (e, moduleId) => {
    e.stopPropagation();
    setModuleId(moduleId);
    toggle();
  };
  const handleDeleteModule = (e, moduleId) => {
    e.stopPropagation();
    props.deleteModule(moduleId);
  };
  return (
    <div className="container">
      <ModalModule
        modal={modal}
        toggle={toggle}
        moduleId={moduleId}
        handleSaveModel={handleSaveModel}
      />
      <div className="select2-container">
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
        {licenseId && <DrawModules handleSelectModule={handleSelectModule} handleDeleteModule={handleDeleteModule}/>}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModuleByLicense);
