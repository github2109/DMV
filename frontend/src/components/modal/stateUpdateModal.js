import React from "react";
import { connect } from "react-redux";
import { ModalBody, ModalFooter, ModalHeader, Modal, Button } from "reactstrap";
import { useState } from "react";
import "./style.css";
const StateUpdateModal = ({
  isOpen,
  toggleFromParent,
  updateState,
  currentState,
}) => {
  const [name, setName] = useState(currentState.name);
  const handleUpdateUser = (event, id, name) => {
    updateState(event, id, name);
    toggleFromParent();
  };
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={() => toggleFromParent()}>
        Update state info
      </ModalHeader>
      <ModalBody>
        <div className="modal-state-body">
          <div className="input-container">
            <label>Name</label>
            <input
              type="text"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
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
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(StateUpdateModal);
