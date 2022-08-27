/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { connect } from "react-redux";
import { initializeLicense } from "../../reducers/licenseReducer";
import "./style.css";
const Licenses = (props) => {
  useEffect(() => {
    props.initializeLicense();
  }, []);
  return (<div className="container">
    <div className="licenses-container">
      
    </div>
  </div>);
};

const mapStateToProps = (state) => {
  return {
    licenses: state.licenses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initializeLicense: () => dispatch(initializeLicense()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Licenses);
