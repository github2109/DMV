/* eslint-disable react-hooks/exhaustive-deps */
import "../style.css";
import { useDispatch, useSelector } from "react-redux";
import NormalModule from "../../module/normal";
import { Link } from "react-router-dom";
import ModalListModule from "../../modal/ModalListModule/ModalListModule";
import NormalExam from "../../exam";
import { useState, useEffect } from "react";
import ExamModal from "../../../components/modal/ModalExam/modalExam";
import ModalDetailModule from "../../modal/ModalDetailModule";
import SelectionModal from "../../../components/modal/ModalSelection/ModalSelection";
import {
  createModule
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
  handleDeleteModule
}) => {

  useEffect(() => {
    dispatch(initializeExam(stateId, licenseId));
  }, [stateId, licenseId]);

  const [currentExam, setCurrentExam] = useState(null);
  const [modalExam, setModalExam] = useState(false);
  const [modalAddModule, setModalAddModule] = useState(false);
  const [selectionModal, setSelectionModal] = useState(false);

  const dispatch = useDispatch();
  const modules = useSelector(state => state.modules);
  const exams = useSelector(state => state.exams);

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
      dispatch(onLoading());
      if (isCreate) {
        await dispatch(createExam(newExam, stateId, licenseId));
        dispatch(setSuccessNotification("Exam created successfully"));
      } else {
        await dispatch(updateExam(oldExam, newExam));
        dispatch(setSuccessNotification("Exam updated successfully"));
      }
      dispatch(offLoading());
      toggleExam();
    } catch (error) {
      dispatch(offLoading());
      dispatch(setErrorNotification(error.response.data.message));
    }
  };
  const handleAddModule = async (oldModule, newModule, isCreate) => {
    try {
      dispatch(onLoading());
      newModule.license = licenseId;
      newModule.states = stateId;
      newModule.position = modules.length + 1;
      const newModuleSaved = await dispatch(createModule(newModule));
      dispatch(setSuccessNotification("Module created successfully"));
      dispatch(offLoading());
      toggleAddModule();
      return newModuleSaved;
    } catch (error) {
      dispatch(offLoading());
      dispatch(setErrorNotification(error.response.data.message));
    }
  };
  const handleDeleteExam = (e, exam) => {
    e.stopPropagation();
    try {
      dispatch(onLoading());
      dispatch(deleteExam(exam)).then((res) => {
        dispatch(offLoading());
        dispatch(setSuccessNotification("Exam removed successfully"));
      });
    } catch (error) {
      dispatch(offLoading());
      dispatch(setErrorNotification(error.response.data.message));
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
              {exams.map((exam, position) => (
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
              {modules.map((module, position) => (
                <NormalModule
                  handleDeleteModule={handleDeleteModule}
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

export default NormalModules;
