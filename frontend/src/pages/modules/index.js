/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
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
  setModules,
} from "../../reducers/moduleReducer";
import "./style.css";
import CustomButton from "../../components/button/CustomButton";
import PlusButton from "../../components/button/PlusButton";
import ModalDetailModule from "../../components/modal/ModalDetailModule";
import ModalQuestion from "../../components/modal/ModalQuestion";
import ModalImport from "../../components/modal/ModalImport";
const Modules = () => {
  const [licenseId, setLicenseId] = useState(null);
  const dispatch = useDispatch();
  const modules = useSelector((state) => state.modules);
  const licenses = useSelector((state) => state.licenses);

  useEffect(() => {
    dispatch(initializeLicense());
  }, []);
  useEffect(() => {
    if (licenseId) {
      dispatch(onLoading());
      dispatch(setModuleByLicenseId(licenseId)).then((res) =>
        dispatch(offLoading())
      );
    }
  }, [licenseId]);
  const [modalDetailModule, setModalDetailModule] = useState(false);
  const [modalImportModule, setModalImportModule] = useState(false);
  const [modalQuestion, setModalQuestion] = useState(false);
  const [moduleId, setModuleId] = useState(null);
  const toggleDetailModule = () => setModalDetailModule(!modalDetailModule);
  const toggleQuestion = () => {
    setModalQuestion(!modalQuestion);
  };
  const toggleModalImportModule = () => {
    setModalImportModule(!modalImportModule);
  };
  const handleSavePositionClick = () => {
    try {
      dispatch(onLoading());
      dispatch(savePositionModule(modules)).then((res) => {
        dispatch(offLoading());
        dispatch(
          setSuccessNotification(
            "Position of licenses was updated successfully"
          )
        );
      });
    } catch (error) {
      dispatch(offLoading());
      dispatch(setErrorNotification(error.response.data.message));
    }
  };
  const handleClickCreateModule = () => {
    setModuleId(null);
    toggleDetailModule();
  };
  const handleSaveModal = async (oldModule, newModule, isCreate) => {
    try {
      dispatch(onLoading());
      if (isCreate) {
        newModule.license = licenseId;
        newModule.position = modules.length + 1;
        const newModuleSaved = await dispatch(createModule(newModule));
        dispatch(setSuccessNotification("Module created successfully"));
        return newModuleSaved;
      } else {
        await dispatch(updateModule(oldModule, newModule));
        dispatch(setSuccessNotification("Module updated successfully"));
      }
      dispatch(offLoading());
      toggleDetailModule();
    } catch (error) {
      dispatch(offLoading());
      dispatch(setErrorNotification(error.response.data.message));
    }
  };
  const handleSelectModule = (e, moduleId) => {
    e.stopPropagation();
    setModuleId(moduleId);
  };
  const handleEditModule = (e, moduleId) => {
    e.stopPropagation();
    setModuleId(moduleId);
    toggleDetailModule();
  };
  const handleDeleteModule = (e, moduleId) => {
    e.stopPropagation();
    try {
      dispatch(onLoading());
      dispatch(deleteModule(moduleId)).then((res) => {
        dispatch(offLoading());
        dispatch(setSuccessNotification("Module removed successfully"));
      });
    } catch (error) {
      dispatch(offLoading());
      dispatch(setErrorNotification(error.response.data.message));
    }
  };
  const handleSaveModalImport = (data) => {
    try {
      dispatch(onLoading());
      let promises = [];
      data.forEach((module) => {
        promises.push(dispatch(createModule(module)));
      });
      Promise.all([...promises]).then(() => {
        toggleModalImportModule();
        dispatch(offLoading());
      });
    } catch (error) {
      dispatch(offLoading());
      dispatch(setErrorNotification(error.response.data.message));
    }
  };
  return (
    <div className="container">
      {modalDetailModule && (
        <ModalDetailModule
          modal={modalDetailModule}
          toggle={toggleDetailModule}
          moduleId={moduleId}
          handleSaveModal={handleSaveModal}
          toggleModalImportModule={() => {
            toggleDetailModule();
            toggleModalImportModule();
          }}
        />
      )}
      {modalImportModule && (
        <ModalImport
          licenseId={licenseId}
          modal={modalImportModule}
          toggle={toggleModalImportModule}
          componentImport="module"
          toggleModalDetail={toggleDetailModule}
          handleSaveModal={handleSaveModalImport}
        />
      )}
      {modalQuestion && (
        <ModalQuestion
          modal={modalQuestion}
          toggle={toggleQuestion}
          moduleId={moduleId}
        />
      )}
      <div className="select2-container">
        {moduleId && (
          <CustomButton
            className="manage-question-button"
            labelName="Manage questions"
            handleClick={toggleQuestion}
          />
        )}
        <Select
          listData={licenses}
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
            modules={modules}
            setModules={(modules) => dispatch(setModules(modules))}
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

export default Modules;
