import { useEffect } from "react";
import { connect } from "react-redux";
import { setModuleByStateIdAndLicenseId } from "../../reducers/moduleReducer";
const Modules = (props) => {
  useEffect(() => {
    props.setModuleByStateIdAndLicenseId(props.stateId, props.licenseId);
  }, []);
  return <div>
    
  </div>;
};

const mapStateToProps = (state) => {
  return {
    modules: state.modules,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setModuleByStateIdAndLicenseId: (stateId, licenseId) =>
      dispatch(setModuleByStateIdAndLicenseId(stateId, licenseId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modules);
