import { useEffect } from "react";
import { connect } from "react-redux";
import {
  initializeState,
  createState,
  deleteState,
  updateState,
} from "../../reducers/stateReducer";

import NormalStates from "../../components/states/normal";
import { useState } from "react";
import "./style.css";
import StateModal from "../../components/modal/stateModal";
const States = (props) => {
  useEffect(() => {
    props.initializeState();
  }, []);
  const [currentState, setCurrentState] = useState(null);
  const [message, setMessage] = useState(null);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const handleClickCreateState = () => {
    setCurrentState(null);
    toggle();
  };
  const handleClickUpdateState = (state) => {
    setCurrentState(state);
    toggle();
  };
  const handleSaveModal = async (oldState, newState, isCreate) => {
    if (isCreate) {
      await props.createState(newState);
    } else {
      await props.updateState(oldState, newState);
    }
    toggle();
  };
  const handleDeleteState = (e, state) => {
    e.stopPropagation();
    props.deleteState(state);
  };

  return (
    <div className="container">
      <StateModal
        modal={modal}
        toggle={toggle}
        curentState={currentState}
        handleSaveModal={handleSaveModal}
      />
      <div className="mx-1">
        <button
          className="btn btn-primary px-3"
          onClick={() => handleClickCreateState()}
        >
          <i className="fas fa-plus"></i>Add new user
        </button>
      </div>
      <NormalStates
        handleUpdateState={handleClickUpdateState}
        handleDeleteState={handleDeleteState}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    states: state.states,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    initializeState: () => dispatch(initializeState()),
    createState: (state) => dispatch(createState(state)),
    updateState: (oldState, newState) =>
      dispatch(updateState(oldState, newState)),
    deleteState: (state) => dispatch(deleteState(state)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(States);
