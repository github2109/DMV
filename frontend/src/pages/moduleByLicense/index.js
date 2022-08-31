/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from "react-redux";
import { setModuleByLicenseId } from "../../reducers/moduleReducer";
import { useEffect, useState } from "react";
import DrawModules from "../../components/modules/draw";
import Select from "../../components/select";
import { initializeLicense } from "../../reducers/licenseReducer";
import { savePositionModule } from "../../reducers/moduleReducer";
import "./style.css";
import CustomButton from "../../components/button/CustomButton";
import PlusButton from "../../components/button/PlusButton";
const ModuleByLicense = (props) => {
  const [licenseId, setLicenseId] = useState(null);
  useEffect(() => {
    props.initializeLicense();
  }, []);
  useEffect(() => {
    if (licenseId) props.setModuleByLicenseId(licenseId);
  }, [licenseId]);
  const handleSaveClick = () => {
    props.savePositionModule(props.modules);
  };
  return (
    <div className="module-licenses-container">
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
          handleSaveClick={handleSaveClick}
        />
      </div>
      <div className="modules-container">
        {licenseId && <DrawModules />}
        {licenseId && <div className="create-module-into-license">
          <PlusButton />
        </div>}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModuleByLicense);
