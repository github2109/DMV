import "./style.css";
import { connect } from "react-redux";

const Notification = (props) => {
  if (!props.responseUI.notification) return null;
  if (!props.responseUI.isErrorNotification)
    return (
      <div className="Message Message--green">
        <div className="Message-icon">
          <i className="fa fa-check"></i>
        </div>
        <div className="Message-body">
          <p>{props.responseUI.notification}</p>
        </div>
      </div>
    );
  else
    return (
      <div className="Message Message--red">
        <div className="Message-icon">
          <i className="fa fa-times"></i>
        </div>
        <div className="Message-body">
          <p>{props.responseUI.notification}</p>
        </div>
      </div>
    );
};
const mapStateToProps = (state) => {
  return {
    responseUI: state.responseUI,
  };
};
export default connect(mapStateToProps)(Notification);
