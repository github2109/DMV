import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ModalBody, ModalFooter, ModalHeader, Modal, Button } from "reactstrap";
import { useState } from "react";
import "./style.css";
const StateModal = ({ modal, toggle, curentState, handleSaveModal }) => {
  const [name, setName] = useState("");
  const [isCreted, setIsCreted] = useState(false);
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
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={() => toggle()}>State</ModalHeader>
      <ModalBody>
        <div className="modal-state-body">
          <div className="input-container">
            <label>Name</label>
            <input
              className="input-text-state"
              type="text"
              onChange={handleInputChange}
              value={name}
              placeholder="Enter state's name"
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          className="px-3"
          onClick={(event) => handleSaveModal(curentState, name, isCreted)}
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
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(StateModal);
