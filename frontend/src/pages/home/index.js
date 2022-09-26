/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from "react-redux";
import { initializeState } from "../../reducers/stateReducer";
import { initializeLicense } from "../../reducers/licenseReducer";
import { setStateId, setLicenseId } from "../../reducers/filterReducer";
import {
  setModuleByStateIdAndLicenseId,
  getModuleByLicenseId,
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
import ModalListModule from "../../components/modal/ModalListModule/ModalListModule";
import "./style.css";
import { useEffect, useState } from "react";
import { Button } from "reactstrap";

const Home = (props) => {
  useEffect(() => {
    props.initializeState();
    props.initializeLicense();
  }, []);
  useEffect(() => {
    if (props.filter.stateId && props.filter.licenseId) {
      props.onLoading();
      props
        .setModuleByStateIdAndLicenseId(
          props.filter.stateId,
          props.filter.licenseId
        )
        .then((res) => props.offLoading());
    }
  }, [props.filter]);
  const [isShowExam, setIsShowExam] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const toggleIsShowExam = () => setIsShowExam(!isShowExam);
  const handleDeleteModule = (e, module) => {
    e.stopPropagation();
    try {
      props.onLoading();
      props
        .deleteModuleFromState(module._id, props.filter.stateId)
        .then((res) => {
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
      <div className="select-container">
        <Select
          listData={props.states}
          className="select-state"
          nameSelect="state"
          item={props.filter.stateId}
          setItem={props.setStateId}
        />
        {props.filter.stateId && props.filter.licenseId && (
          <Button className=" manage-exam" onClick={toggleIsShowExam}>
            {!isShowExam ? (
              <i className="fas fa-store-slash"></i>
            ) : (
              <i className="fas fa-store"></i>
            )}
          </Button>
        )}
        <Select
          listData={props.licenses}
          className="select-license"
          nameSelect="license"
          item={props.filter.licenseId}
          setItem={props.setLicenseId}
        />
      </div>
      <div className="modules-container">
        {props.filter.stateId && props.filter.licenseId && (
          <NormalModules
            handleDeleteModule={handleDeleteModule}
            stateId={props.filter.stateId}
            licenseId={props.filter.licenseId}
            toggle={toggle}
            modal={modal}
            isShowExam={isShowExam}
            toggleIsShowExam={toggleIsShowExam}
          />
        )}
      </div>
      <div className="footer-modules-container">
        {!props.filter.stateId && !props.filter.licenseId && (
          <div>
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
    states: state.states,
    licenses: state.licenses,
    filter: state.filter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initializeState: () => {
      dispatch(initializeState());
    },
    initializeLicense: () => {
      dispatch(initializeLicense());
    },
    setStateId: (stateId) => dispatch(setStateId(stateId)),
    setLicenseId: (licenseId) => dispatch(setLicenseId(licenseId)),

    setModuleByStateIdAndLicenseId: (stateId, licenseId) =>
      dispatch(setModuleByStateIdAndLicenseId(stateId, licenseId)),
    onLoading: () => dispatch(onLoading()),
    offLoading: () => dispatch(offLoading()),
    deleteModuleFromState: (moduleId, stateId) =>
      dispatch(deleteModuleFromState(moduleId, stateId)),
    setSuccessNotification: (mess) => dispatch(setSuccessNotification(mess)),
    setErrorNotification: (mess) => dispatch(setErrorNotification(mess)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
