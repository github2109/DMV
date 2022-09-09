import { useEffect } from "react";
import { connect } from "react-redux";
import {
  initializeState,
  createState,
  deleteState,
  updateState,
} from "../../reducers/stateReducer";
import {
  onLoading,
  offLoading,
  setSuccessNotification,
  setErrorNotification,
} from "../../reducers/responseUIReducer";
import NormalStates from "../../components/states/normal";
import { useState } from "react";
import "./style.css";
import StateModal from "../../components/modal/ModalState/stateModal";
import PlusButton from "../../components/button/PlusButton";
const States = (props) => {
  useEffect(() => {
    props.initializeState();
  }, []);
  const [currentState, setCurrentState] = useState(null);
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
    try {
      props.onLoading();
      if (isCreate) {
        await props.createState(newState);
        props.setSuccessNotification("State created successfully")
      } else {
        await props.updateState(oldState, newState);
        props.setSuccessNotification("State updated successfully")
      }
      props.offLoading();
      toggle();
    } catch (error) {
      props.offLoading();
      props.setErrorNotification(error.response.data.message);
    }
  };
  const handleDeleteState = (e, state) => {
    e.stopPropagation();
    try {
      props.onLoading();
      props.deleteState(state).then((res) => {
        props.offLoading();
        props.setSuccessNotification("State removed successfully");
      });
    } catch (error) {
      props.offLoading();
      props.setErrorNotification(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <StateModal
        modal={modal}
        toggle={toggle}
        curentState={currentState}
        handleSaveModal={handleSaveModal}
      />
      <div className="states-container-parent">
        <div className="states-header">State</div>
        <div className="states-body">
          <NormalStates
            handleUpdateState={handleClickUpdateState}
            handleDeleteState={handleDeleteState}
          />
        </div>
        <div className="create-state">
          <PlusButton handleClick={handleClickCreateState} />
        </div>
      </div>
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
    onLoading: () => dispatch(onLoading()),
    offLoading: () => dispatch(offLoading()),
    setSuccessNotification: (mess) => dispatch(setSuccessNotification(mess)),
    setErrorNotification: (mess) => dispatch(setErrorNotification(mess)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(States);
