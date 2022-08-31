import React from "react";
import { connect } from "react-redux";
import { ModalBody, ModalFooter, ModalHeader, Modal, Button } from "reactstrap";
import { useState } from "react";
import "./style.css";
const StateModal = ({ isOpen, toggleFromParent, AddNewState }) => {
  const [name, setName] = useState("");
  const handleAddState = (event, state) => {
    AddNewState(event, state);
    toggleFromParent();
  };
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={() => toggleFromParent()}>
        Create a new state
      </ModalHeader>
      <ModalBody>
        <div className="modal-state-body">
          <div className="input-container">
            <label>Name</label>
            <input
              className="input-text-state"
              type="text"
              onChange={(event) => setName(event.target.value)}
              value={name}
              placeholder="Enter state's name"
              required
            />
            <div class="invalid-feedback">
              Please enter a valid email address
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          className="px-3"
          onClick={(event) => handleAddState(event, name)}
        >
          {" "}
          Add new
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
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(StateModal);
