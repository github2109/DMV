import { connect } from "react-redux";
import { setModuleByLicenseId } from "../../reducers/moduleReducer";
import { useEffect, useState } from "react";
import DrawModules from "../../components/modules/draw";
import Select from "../../components/select";
import { initializeLicense } from "../../reducers/licenseReducer";
import "./style.css";
const ModuleByLicense = (props) => {
  const [licenseId, setLicenseId] = useState(null);
  useEffect(() => {
    props.initializeLicense();
  }, [licenseId]);
  useEffect(() => {
    if (licenseId) props.setModuleByLicenseId(licenseId);
  }, [licenseId]);
  return (
    <div className="container">
      <div className="select2-container">
        <Select
          listData={props.licenses}
          className=""
          nameSelect="license"
          item={licenseId}
          setItem={setLicenseId}
        />
      </div>
      {licenseId && <DrawModules />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    licenses: state.licenses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setModuleByLicenseId: (licenseId) =>
      dispatch(setModuleByLicenseId(licenseId)),

    initializeLicense: () => {
      dispatch(initializeLicense());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModuleByLicense);
