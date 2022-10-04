/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ModalBody, ModalFooter, ModalHeader, Modal, Button } from "reactstrap";
import "./style.css";
import {
  getModuleByLicenseId,
  addModulesToState,
} from "../../../reducers/moduleReducer";
import {
  onLoading,
  offLoading,
  setErrorNotification,
  setSuccessNotification,
} from "../../../reducers/responseUIReducer";
import CheckBoxModules from "../../modules/CheckBox";
const ModalListModule = ({ modal, toggle, licenseId, ...props }) => {
  const [modules, setModules] = useState({});
  useEffect(() => {
    props.onLoading();
    try {
      props.getModuleByLicenseId(licenseId).then((res) => {
        const arr = res.filter(
          ({ _id }) => !props.modules.some((x) => x._id === _id)
        );
        setModules(
          arr.map((module) => {
            module.isChoose = false;
            return module;
          })
        );
        props.offLoading();
      });
    } catch (error) {
      props.offLoading();
      props.setErrorNotification(error.response.data.message);
    }
  }, [modal]);
  const handleOnChangeCheckBox = (e, position) => {
    let arr = modules;
    arr[position].isChoose = e.target.checked;
    setModules([...arr]);
  };
  const handleAddClick = () => {
    const listModules = modules.filter((module) => module.isChoose === true);
    const modulesId = listModules.map((module) => module._id);
    try {
      props.onLoading();
      props.addModulesToState(modulesId, props.stateId).then((res) => {
        props.setSuccessNotification("Modules added to state successfully");
        props.offLoading();
        toggle();
      });
    } catch (error) {
      props.offLoading();
      props.setErrorNotification(error);
      toggle();
    }
  };
  return (
    <Modal isOpen={modal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Choose modules you want to add</ModalHeader>
      <ModalBody>
        <div className="list-modules-container">
          <div className="states-header">Modules</div>
          <div className="states-body">
            {modal === true && modules.length === 0 ? (
              <div>
                <span> You can't add any modules</span>
              </div>
            ) : (
              modules && (
                <CheckBoxModules
                  handleOnChangeCheckBox={handleOnChangeCheckBox}
                  modules={modules}
                />
              )
            )}
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" className="px-3" onClick={handleAddClick}>
          {" "}
          Add
        </Button>{" "}
        <Button onClick={toggle}> Close</Button>
      </ModalFooter>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getModuleByLicenseId: (licenseId) =>
      dispatch(getModuleByLicenseId(licenseId)),
    addModulesToState: (moduleId, stateId) =>
      dispatch(addModulesToState(moduleId, stateId)),
    onLoading: () => dispatch(onLoading()),
    offLoading: () => dispatch(offLoading()),
    setErrorNotification: (mess) => dispatch(setErrorNotification(mess)),
    setSuccessNotification: (mess) => dispatch(setSuccessNotification(mess)),
  };
};
const mapStateToProps = (state) => {
  return {
    modules: state.modules,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalListModule);
