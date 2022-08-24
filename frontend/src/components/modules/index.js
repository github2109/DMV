import "./style.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import { setModuleByStateIdAndLicenseId } from "../../reducers/moduleReducer";
import Module from "../module";
const Modules = (props) => {
  useEffect(() => {
    props.setModuleByStateIdAndLicenseId(props.filter.stateId, props.filter.licenseId);
  }, [props.filter]);
  return (
    <div className="modules-container">
    <article className="leaderboard">
      <main className="leaderboard__profiles">
        {props.modules.map((module,position) => (
          <Module key={module._id} module={module} position={position}/>
        ))}
      </main>
    </article>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    modules: state.modules,
    filter: state.filter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setModuleByStateIdAndLicenseId: (stateId, licenseId) =>
      dispatch(setModuleByStateIdAndLicenseId(stateId, licenseId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modules);
