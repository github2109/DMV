/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ModalBody, ModalFooter, ModalHeader, Modal, Button } from "reactstrap";
import { useState } from "react";
import { setErrorNotification } from "../../../reducers/responseUIReducer";
import "./style.css";
const StateModal = ({ modal, toggle, curentState, handleSaveModal }) => {
  const [name, setName] = useState("");
  const [isCreted, setIsCreted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (curentState === null) {
      setIsCreted(true);
      setName("");
    } else {
      setName(curentState.name);
      setIsCreted(false);
    }
  }, [modal]);
  const handleInputChange = (e) => {
    setName(e.target.value);
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
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={() => toggle()}>State</ModalHeader>
      <ModalBody>
        <div className="modal-state-body">
          <div className="input-state-container">
            <label>Name</label>
            <div
              className="wrap-input validate-input"
              data-validate="State name is required"
            >
              <input
                className="input-text-state"
                type="text"
                onChange={handleInputChange}
                value={name}
                onBlur={handleBlur}
                onFocus={handleFocus}
                placeholder="Enter state's name"
              />
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          className="px-3"
          onClick={(event) => {
            if (name === "") {
              dispatch(setErrorNotification("Please enter a state name !!"));
              return;
            }
            handleSaveModal(curentState, name, isCreted);
          }}
        >
          {" "}
          Save
        </Button>{" "}
        <Button color="secondary" className="px-3" onClick={() => toggle()}>
          {" "}
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default StateModal;
