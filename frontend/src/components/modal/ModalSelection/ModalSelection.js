import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ModalBody, ModalFooter, ModalHeader, Modal, Button } from "reactstrap";
import "./style.css";
const SelectionModal = ({
  modal,
  toggle,
  toggleAddNewModule,
  toggleAddModule,
}) => {
  const handleClickNewModule = () => {
    toggle();
    toggleAddNewModule();
  };
  const handleClickAddModule = () => {
    toggle();
    toggleAddModule();
  };
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={() => toggle()}>Add module to state</ModalHeader>
      <ModalBody>
        <div className="selection-container">
          <article className="leaderboard">
            <main className="leaderboard__profiles">
              <article
                className="leaderboard__normalselection"
                id="1"
                onClick={handleClickNewModule}
              >
                <span className="position">1</span>
                <span className="leaderboard__selection">New module</span>
              </article>
              <article
                className="leaderboard__normalselection"
                id="2"
                onClick={handleClickAddModule}
              >
                <span className="position">2</span>
                <span className="leaderboard__selection">Existing module</span>
              </article>
            </main>
          </article>
        </div>
      </ModalBody>
      <ModalFooter>
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectionModal);
