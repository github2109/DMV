import { useEffect } from "react";
import { connect } from "react-redux";
import { initializeState } from "../../reducers/stateReducer";
import "./style.css";
const States = (props) => {
  useEffect(() => {
    props.initializeState();
  }, []);
  return (
    <div className="container">
      <div className="states-container"></div>
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
