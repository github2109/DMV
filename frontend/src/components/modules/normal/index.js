import "../style.css";
import { connect } from "react-redux";
import NormalModule from "../../module/normal";
import { Link } from "react-router-dom";
import ModalListModule from "../../modal/ModalListModule/ModalListModule";
import NormalExam from "../../exam";
import { useState, useEffect} from "react";
import ExamModal from "../../../components/modal/ModalExam/modalExam";
import ModalDetailModule from "../../modal/ModalDetailModule";
import SelectionModal from "../../../components/modal/ModalSelection/ModalSelection";
import {
  createModule,
  addModulesToState,
} from "../../../reducers/moduleReducer";
import {
  initializeExam,
  createExam,
  updateExam,
  deleteExam,
} from "../../../reducers/examReducer";
import {
  onLoading,
  offLoading,
  setSuccessNotification,
  setErrorNotification,
} from "../../../reducers/responseUIReducer";
const NormalModules = ({
  isShowExam,
  toggleIsShowExam,
  toggle,
  modal,
  licenseId,
  stateId,
  ...props
}) => {
  useEffect(() => {
    props.initializeExam(stateId, licenseId);
  }, []);
  const [currentExam, setCurrentExam] = useState(null);
  const [modalExam, setModalExam] = useState(false);
  const [modalAddModule, setModalAddModule] = useState(false);
  const [selectionModal, setSelectionModal] = useState(false);
  const toggleSelectionModal = () => setSelectionModal(!selectionModal);
  const toggleAddModule = () => setModalAddModule(!modalAddModule);
  const toggleExam = () => setModalExam(!modalExam);
  const handleClickCreateExam = () => {
    setCurrentExam(null);
    toggleExam();
  };
  const handleClickUpdateExam = (exam) => {
    setCurrentExam(exam);
    toggleExam();
  };
  const handleSaveExamModal = async (oldExam, newExam, isCreate) => {
    try {
      props.onLoading();
      if (isCreate) {
        await props.createExam(newExam, stateId, licenseId);
        props.setSuccessNotification("Exam created successfully");
      } else {
        await props.updateExam(oldExam, newExam);
        props.setSuccessNotification("Exam updated successfully");
      }
      props.offLoading();
      toggleExam();
    } catch (error) {
      props.offLoading();
      props.setErrorNotification(error.response.data.message);
    }
  };
  const handleAddModule = async (oldModule, newModule, isCreate) => {
    try {
      props.onLoading();
      newModule.license = licenseId;
      newModule.states = stateId;
      newModule.position = props.modules.length + 1;
      const newModuleSaved = await props.createModule(newModule);
      props.setSuccessNotification("Module created successfully");
      props.offLoading();
      toggleAddModule();
      return newModuleSaved;
    } catch (error) {
      props.offLoading();
      props.setErrorNotification(error.response.data.message);
    }
  };
  const handleDeleteExam = (e, exam) => {
    e.stopPropagation();
    try {
      props.onLoading();
      props.deleteExam(exam).then((res) => {
        props.offLoading();
        props.setSuccessNotification("Exam removed successfully");
      });
    } catch (error) {
      props.offLoading();
      props.setErrorNotification(error.response.data.message);
    }
  };
  return (
    <div className="modules-container">
      <SelectionModal
        modal={selectionModal}
        toggle={toggleSelectionModal}
        toggleAddNewModule={toggleAddModule}
        toggleAddModule={toggle}
      />
      <div className="modules-content">
        {stateId && licenseId && isShowExam === true ? (
          <article className="leaderboard">
            <ExamModal
              modal={modalExam}
              toggle={toggleExam}
              currentExam={currentExam}
              handleSaveModal={handleSaveExamModal}
              stateId={stateId}
              licenseId={licenseId}
            />

            <main className="leaderboard__profiles">
              {props.exams.map((exam, position) => (
                <NormalExam
                  key={exam._id}
                  exam={exam}
                  position={position}
                  handleClickUpdateExam={handleClickUpdateExam}
                  handleDeleteExam={handleDeleteExam}
                />
              ))}
            </main>
          </article>
        ) : (
          <article className="leaderboard">
            <ModalDetailModule
              modal={modalAddModule}
              toggle={toggleAddModule}
              handleSaveModal={handleAddModule}
              moduleId={null}
            />
            <main className="leaderboard__profiles">
              {props.modules.map((module, position) => (
                <NormalModule
                  handleDeleteModule={props.handleDeleteModule}
                  key={module._id}
                  module={module}
                  position={position}
                />
              ))}
            </main>
          </article>
        )}
      </div>
      <div className="footer-modules-container">
        {stateId && licenseId && (
          <div>
            <ModalListModule
              modal={modal}
              toggle={toggle}
              getModuleByLicenseId={props.getModuleByLicenseId}
              licenseId={licenseId}
              stateId={stateId}
            />
            {!isShowExam ? (
              <span className="input-add-module" onClick={toggleSelectionModal}>
                Add new module
              </span>
            ) : (
              <span
                className="input-add-module"
                onClick={handleClickCreateExam}
              >
                Add new exam
              </span>
            )}
            <Link to={"/modules"} className="link-manage-module">
              <span>Manage module</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    modules: state.modules,
    exams: state.exams,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    initializeExam: (stateId, licenseId) =>
      dispatch(initializeExam(stateId, licenseId)),
    createExam: (exam, stateId, licenseId) =>
      dispatch(createExam(exam, stateId, licenseId)),
    updateExam: (oldExam, newExam) => dispatch(updateExam(oldExam, newExam)),
    deleteExam: (exam) => dispatch(deleteExam(exam)),
    onLoading: () => dispatch(onLoading()),
    offLoading: () => dispatch(offLoading()),
    setSuccessNotification: (mess) => dispatch(setSuccessNotification(mess)),
    setErrorNotification: (mess) => dispatch(setErrorNotification(mess)),
    createModule: (newModule) => dispatch(createModule(newModule)),
    addModulesToState: (moduleId, stateId) =>
      dispatch(addModulesToState(moduleId, stateId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NormalModules);
