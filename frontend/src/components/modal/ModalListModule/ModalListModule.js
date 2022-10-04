/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
const ModalListModule = ({ modal, toggle, licenseId, stateId }) => {
  const [modules, setModules] = useState({});
  const dispatch = useDispatch();
  const modulesInStore = useSelector((state) => state.modules);

  useEffect(() => {
    dispatch(onLoading());
    try {
      dispatch(getModuleByLicenseId(licenseId)).then((res) => {
        const arr = res.filter(
          ({ _id }) => !modulesInStore.some((x) => x._id === _id)
        );
        setModules(
          arr.map((module) => {
            module.isChoose = false;
            return module;
          })
        );
        dispatch(offLoading());
      });
    } catch (error) {
      dispatch(offLoading());
      dispatch(setErrorNotification(error.response.data.message));
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
      dispatch(onLoading());
      dispatch(addModulesToState(modulesId,stateId)).then((res) => {
        dispatch(setSuccessNotification("Modules added to state successfully"));
        dispatch(offLoading());
        toggle();
      });
    } catch (error) {
      dispatch(offLoading());
      dispatch(setErrorNotification(error.response.data.message));
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

export default ModalListModule;
