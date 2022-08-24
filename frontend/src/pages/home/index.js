import { connect } from "react-redux";
import { initializeState } from "../../reducers/stateReducer";
import { initializeLicense } from "../../reducers/licenseReducer";
import Select from "../../components/select";
import "./style.css";
import { useEffect, useState } from "react";

const Home = (props) => {
  const [stateId, setStateId] = useState(null);
  const [licenseId, setLicenseId] = useState(null);
  useEffect(() => {
    props.initializeState();
    props.initializeLicense();
  }, []);
  return (
    <div className="container">
      <Select
        listData={props.states}
        className="select-state"
        nameSelect="state"
        item={stateId}
        setItem={setStateId}
      />
      <Select
        listData={props.licenses}
        className="select-license"
        nameSelect="license"
        item={licenseId}
        setItem={setLicenseId}
      />
      <div className="module-container"></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    states: state.states,
    licenses: state.licenses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initializeState: () => {
      dispatch(initializeState());
    },
    initializeLicense: () => {
      dispatch(initializeLicense());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
