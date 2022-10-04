/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
const Licenses = () => {
  const dispatch = useDispatch();
  const licenses = useSelector((state) => state.licenses);

  useEffect(() => {
    dispatch(initializeLicense());
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
        dispatch(onLoading());
        await dispatch(createLicense(newLicense));
        dispatch(offLoading());
        dispatch(setSuccessNotification("License created successfully"));
      } else {
        dispatch(onLoading());
        await dispatch(updateLicense(oldLicense, newLicense));
        dispatch(offLoading());
        dispatch(setSuccessNotification("License updated successfully"));
      }
      toggle();
    } catch (error) {
      dispatch(setErrorNotification(error.response.data.message));
      dispatch(offLoading());
    }
  };
  const handleDeleteLicense = (e, license) => {
    e.stopPropagation();
    try {
      dispatch(onLoading());
      dispatch(deleteLicense(license)).then((res) => {
        dispatch(offLoading());
        dispatch(setSuccessNotification("License removed successfully"));
      });
    } catch (error) {
      dispatch(setErrorNotification(error.response.data.message));
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
          {licenses.map((license) => (
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


export default Licenses;
