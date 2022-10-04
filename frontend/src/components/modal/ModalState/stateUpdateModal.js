import React from "react";
import { useDispatch } from "react-redux";
import { ModalBody, ModalFooter, ModalHeader, Modal, Button } from "reactstrap";
import { useState } from "react";
import { setErrorNotification } from "../../../reducers/responseUIReducer";
import "./style.css";
const StateUpdateModal = ({
  isOpen,
  toggleFromParent,
  updateState,
  currentState,
}) => {
  const [name, setName] = useState(currentState.name);
  const dispatch = useDispatch();

  const handleUpdateUser = (event, id, name) => {
    if (name === "") {
      dispatch(setErrorNotification("Please enter a state name !!"));
      return;
    }
    updateState(event, id, name);
    toggleFromParent();
  };
  const handleBlur = (event) => {
    if (event.target.value === "") {
      event.target.parentElement.classList.add("alert-validate");
      event.target.parentElement.classList.add("border-red");
    }
  };
  const handleFocus = (event) => {
    event.target.parentElement.classList.remove("alert-validate");
    event.target.parentElement.classList.remove("border-red");
  };
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={() => toggleFromParent()}>
        Update state info
      </ModalHeader>
      <ModalBody>
        <div className="modal-state-body">
          <div className="input-state-container">
            <label>Name</label>
            <div
              className="wrap-input validate-input"
              data-validate="State name is required"
            >
              <input
                type="text"
                onChange={(event) => setName(event.target.value)}
                value={name}
                onBlur={handleBlur}
                onFocus={handleFocus}
              />
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          className="px-3"
          onClick={(event) => handleUpdateUser(event, currentState.id, name)}
        >
          {" "}
          Save changes
        </Button>{" "}
        <Button
          color="secondary"
          className="px-3"
          onClick={() => toggleFromParent()}
        >
          {" "}
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default StateUpdateModal;
