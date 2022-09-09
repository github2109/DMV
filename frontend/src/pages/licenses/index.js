/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import License from "../../components/license";
import {
  initializeLicense,
  createLicense,
  updateLicense,
  deleteLicense,
} from "../../reducers/licenseReducer";
import {
  onLoading,
  offLoading,
  setSuccessNotification,
  setErrorNotification,
} from "../../reducers/responseUIReducer";
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
  const handleSaveModel = async (oldLicense, newLicense, isCreate) => {
    try {
      if (isCreate) {
        props.onLoading();
        await props.createLicense(newLicense);
        props.offLoading();
        props.setSuccessNotification("License created successfully");
      } else {
        props.onLoading();
        await props.updateLicense(oldLicense, newLicense);
        props.offLoading();
        props.setSuccessNotification("License updated successfully");
      }
      toggle();
    } catch (error) {
      props.setErrorNotification(error.response.data.message);
      props.offLoading();
    }
  };
  const handleDeleteLicense = (e, license) => {
    e.stopPropagation();
    try {
      props.onLoading();
      props.deleteLicense(license).then((res) => {
        props.offLoading();
        props.setSuccessNotification("License removed successfully");
      });
    } catch (error) {
      props.setErrorNotification(error.response.data.message);
    }
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
              handleDeleteLicense={handleDeleteLicense}
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
    updateLicense: (oldLicense, newLicense) =>
      dispatch(updateLicense(oldLicense, newLicense)),
    deleteLicense: (license) => dispatch(deleteLicense(license)),
    onLoading: () => dispatch(onLoading()),
    offLoading: () => dispatch(offLoading()),
    setSuccessNotification: (mess) => dispatch(setSuccessNotification(mess)),
    setErrorNotification: (mess) => dispatch(setErrorNotification(mess)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Licenses);
