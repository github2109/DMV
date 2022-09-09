import "./style.css";
import { connect } from "react-redux";
const Loading = (props) => {
  if (!props.responseUI.loading) return null;
  return (
    <div className="loading-container">
      <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66">
        <circle
          className="path"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="30"
        ></circle>
      </svg>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    responseUI: state.responseUI,
  };
};
export default connect(mapStateToProps)(Loading);
