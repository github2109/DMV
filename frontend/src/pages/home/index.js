/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { initializeState } from "../../reducers/stateReducer";
import { initializeLicense } from "../../reducers/licenseReducer";
import { setStateId, setLicenseId } from "../../reducers/filterReducer";
import {
  setModuleByStateIdAndLicenseId,
  deleteModuleFromState,
} from "../../reducers/moduleReducer";
import {
  onLoading,
  offLoading,
  setSuccessNotification,
  setErrorNotification,
} from "../../reducers/responseUIReducer";
import { Link } from "react-router-dom";
import Select from "../../components/select";
import NormalModules from "../../components/modules/normal";
import "./style.css";
import { useEffect, useState } from "react";
import { Button } from "reactstrap";

const Home = () => {
  const dispatch = useDispatch();
  const states = useSelector((state) => state.states);
  const licenses = useSelector((state) => state.licenses);
  const filter = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(initializeState());
    dispatch(initializeLicense());
  }, []);

  useEffect(() => {
    if (filter.stateId && filter.licenseId) {
      dispatch(onLoading());
      dispatch(
        setModuleByStateIdAndLicenseId(filter.stateId, filter.licenseId)
      ).then((res) => dispatch(offLoading()));
    }
  }, [filter]);

  const [isShowExam, setIsShowExam] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const toggleIsShowExam = () => setIsShowExam(!isShowExam);
  const handleDeleteModule = (e, module) => {
    e.stopPropagation();
    try {
      dispatch(onLoading());
      dispatch(deleteModuleFromState(module._id, filter.stateId)).then(
        (res) => {
          dispatch(offLoading());
          dispatch(setSuccessNotification("Module removed successfully"));
        }
      );
    } catch (error) {
      dispatch(offLoading());
      dispatch(setErrorNotification(error.response.data.message));
    }
  };
  return (
    <div className="container">
      <div className="select-container">
        <Select
          listData={states}
          className="select-state"
          nameSelect="state"
          item={filter.stateId}
          setItem={(stateId) => dispatch(setStateId(stateId))}
        />
        {filter.stateId && filter.licenseId && (
          <Button className=" manage-exam" onClick={toggleIsShowExam}>
            {!isShowExam ? (
              <i className="fas fa-store-slash"></i>
            ) : (
              <i className="fas fa-store"></i>
            )}
          </Button>
        )}
        <Select
          listData={licenses}
          className="select-license"
          nameSelect="license"
          item={filter.licenseId}
          setItem={(licenseId) => dispatch(setLicenseId(licenseId))}
        />
      </div>
      <div className="modules-container">
        {filter.stateId && filter.licenseId && (
          <NormalModules
            handleDeleteModule={handleDeleteModule}
            stateId={filter.stateId}
            licenseId={filter.licenseId}
            toggle={toggle}
            modal={modal}
            isShowExam={isShowExam}
            toggleIsShowExam={toggleIsShowExam}
          />
        )}
        <div className="footer-modules-container only-manage-module">
          {!filter.stateId && !filter.licenseId && (
            <Link to={"/modules"} className="link-manage-module">
              <span>Manage module</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
