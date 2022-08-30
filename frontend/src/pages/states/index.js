import { useEffect } from "react";
import { connect } from "react-redux";
import { initializeState } from "../../reducers/stateReducer";

import stateService from "../../services/state";
import NormalStates from "../../components/states/normal";
import { useState } from "react";
import "./style.css";
import StateModal from "../../components/modal/stateModal";
import StateUpdateModal from "../../components/modal/stateUpdateModal";
const States = (props) => {
  useEffect(() => {
    props.initializeState();
  }, []);
  const [currentState, setCurrentState] = useState({});
  const [message, setMessage] = useState(null);
  const [isOpenStateModal, setIsOpenStateModal] = useState(false);
  const [isOpenEditStateModal, setIsOpenEditStateModal] = useState(false);

  const createNewState = async (event, data) => {
    event.preventDefault();
    if (!data) {
      setMessage("Name must be required");
      return;
    }
    try {
      const state = await stateService.createNewState(data);
      if (state) {
        setMessage("create new state successfully");
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  const handleUpdateState = (event, data) => {
    event.preventDefault();
    setCurrentState({ id: data._id, name: data.name });
    setIsOpenEditStateModal(true);
  };
  const doUpdateState = async (event, id, data) => {
    event.preventDefault();
    if (!data || !id) {
      setMessage("Missing parameter ");
      return;
    }
    try {
      const state = await stateService.updateState(id, data);
      if (state) {
        setMessage("Update state successfully");
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  const handleDeleteState = async (event, id) => {
    event.preventDefault();
    if (!id) {
      setMessage("Missing parameter ");
      return;
    }
    try {
      const state = await stateService.deleteState(id);
      if (state) {
        setCurrentState("Delete state successfully");
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  const toggleAddState = () => {
    setIsOpenStateModal(!isOpenStateModal);
  };
  const toggleUpdateState = () => {
    setIsOpenEditStateModal(!isOpenEditStateModal);
    console.log("toggle update state");
  };

  return (
    <div className="container">
      <StateModal
        isOpen={isOpenStateModal}
        AddNewState={createNewState}
        toggleFromParent={toggleAddState}
      />
      {isOpenEditStateModal && (
        <StateUpdateModal
          isOpen={isOpenEditStateModal}
          updateState={doUpdateState}
          toggleFromParent={toggleUpdateState}
          currentState={currentState}
        />
      )}
      <div className="mx-1">
        <button
          className="btn btn-primary px-3"
          onClick={() => toggleAddState()}
        >
          <i className="fas fa-plus"></i>Add new user
        </button>
      </div>
      {
        <NormalStates
          handleUpdateState={handleUpdateState}
          handleDeleteState={handleDeleteState}
        />
      }
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
    initializeState: () => {
      dispatch(initializeState());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(States);
