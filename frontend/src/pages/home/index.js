/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from "react-redux";
import { initializeState } from "../../reducers/stateReducer";
import { initializeLicense } from "../../reducers/licenseReducer";
import { setStateId, setLicenseId } from "../../reducers/filterReducer";
import { setModuleByStateIdAndLicenseId } from "../../reducers/moduleReducer";
import Select from "../../components/select";
import NormalModules from "../../components/modules/normal";
import "./style.css";
import { useEffect } from "react";

const Home = (props) => {
  useEffect(() => {
    props.initializeState();
    props.initializeLicense();
  }, []);

  useEffect(() => {
    if (props.filter.stateId && props.filter.licenseId)
      props.setModuleByStateIdAndLicenseId(
        props.filter.stateId,
        props.filter.licenseId
      );
  }, [props.filter]);
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
        <Select
          listData={props.licenses}
          className="select-license"
          nameSelect="license"
          item={props.filter.licenseId}
          setItem={props.setLicenseId}
        />
      </div>
      {props.filter.stateId && props.filter.licenseId && <NormalModules />}
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
