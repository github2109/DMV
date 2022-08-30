/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import License from "../../components/license";
import {
  initializeLicense,
  createLicense,
} from "../../reducers/licenseReducer";
import PlusButton from "../../components/button/PlusButton";
import ModalLicense from "../../components/modal/ModalLicense";
import "./style.css";
const Licenses = (props) => {
  useEffect(() => {
    props.initializeLicense();
  }, []);
  const [modal, setModal] = useState(false);
  const [license, setLicense] = useState(null);
  const toggle = () => setModal(!modal);
  const handleClickCreateLicense = () => {
    setLicense(null);
    toggle();
  };
  const handleSelectLicense = (license) => {
    setLicense(license);
    toggle();
  };
  const handleSaveModel = (license, isCreate) => {
    if (isCreate) {
      console.log(license);
      props.createLicense(license);
    }
    toggle();
  };
  return (
    <div className="container">
      <ModalLicense
        modal={modal}
        toggle={toggle}
        license={license}
        handleSaveModel={handleSaveModel}
      />
      <div className="licenses-container">
        <div className="licenses-header">License</div>
        <div className="licenses-body">
          {props.licenses.map((license) => (
            <License
              key={license._id}
              license={license}
              handleSelectLicense={handleSelectLicense}
            />
          ))}
        </div>
        <div className="create-license">
          <PlusButton handleClick={handleClickCreateLicense} />
        </div>
      </div>
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
    initializeLicense: () => dispatch(initializeLicense()),
    createLicense: (license) => dispatch(createLicense(license)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Licenses);
