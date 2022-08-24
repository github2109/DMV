import "./style.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import { setModuleByStateIdAndLicenseId } from "../../reducers/moduleReducer";
import Module from "../module";
const Modules = (props) => {
  useEffect(() => {
    props.setModuleByStateIdAndLicenseId(props.stateId, props.licenseId);
  }, []);
  console.log(props.modules)
  return (
    <article className="leaderboard">
      <main className="leaderboard__profiles">
        {props.modules.map((module) => (
          <Module key={module._id} module={module} />
        ))}
      </main>
    </article>
  );
};

const mapStateToProps = (state) => {
  return {
    modules: state.modules,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setModuleByStateIdAndLicenseId: (stateId, licenseId) =>
      dispatch(setModuleByStateIdAndLicenseId(stateId, licenseId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modules);
