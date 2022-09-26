import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ModalBody, ModalFooter, ModalHeader, Modal, Button } from "reactstrap";
import "./style.css";
import {
  getModuleByLicenseId,
  addModulesToState,
} from "../../../reducers/moduleReducer";
import CheckBoxModules from "../../modules/CheckBox";
const ModalListModule = ({ modal, toggle, licenseId, ...props }) => {
  const [modules, setModules] = useState({});
  useEffect(() => {
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
    });
  }, [modal]);
  const handleClickModule = (position) => {
    let arr = modules;
    arr[position].isChoose = !arr[position].isChoose;
    setModules(arr);
    console.log(modules);
  };
  const handleAddClick = () => {
    const listModules = modules.filter((module) => module.isChoose === true);
    const modulesId = listModules.map((module) => module._id);
    props.addModulesToState(modulesId, props.stateId);
    toggle();
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
              <CheckBoxModules
                handleClickModule={handleClickModule}
                modules={modules}
              />
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
    addModulesToState: (moduleId, stateId) => {
      dispatch(addModulesToState(moduleId, stateId));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    modules: state.modules,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalListModule);
