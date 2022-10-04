/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
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
const States = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeState());
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
      dispatch(onLoading());
      if (isCreate) {
        await dispatch(createState(newState));
        dispatch(setSuccessNotification("State created successfully"));
      } else {
        await dispatch(updateState(oldState, newState));
        dispatch(setSuccessNotification("State updated successfully"));
      }
      dispatch(offLoading());
      toggle();
    } catch (error) {
      dispatch(offLoading());
      dispatch(setErrorNotification(error.response.data.message));
    }
  };
  const handleDeleteState = (e, state) => {
    e.stopPropagation();
    try {
      dispatch(onLoading());
      dispatch(deleteState(state)).then((res) => {
        dispatch(offLoading());
        dispatch(setSuccessNotification("State removed successfully"));
      });
    } catch (error) {
      dispatch(offLoading());
      dispatch(setErrorNotification(error.response.data.message));
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

export default States;
