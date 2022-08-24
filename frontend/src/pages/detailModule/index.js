import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useMatch } from "react-router-dom";
import { setModuleByModuleId } from "../../reducers/moduleReducer";
const DetailModule = (props) => {
  const match = useMatch("/modules/:id");
  const [licenseId, setLicenseId] = useState(props.modules.license);
  useEffect(() => {
    props.setModuleByModuleId(match.params.id);
  });
  return <div className="container">
    
  </div>;
};

const mapStateToProps = (state) => {
  return {
    licenses: state.licenses,
    modules: state.modules,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setModuleByModuleId: (moduleId) => dispatch(setModuleByModuleId(moduleId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailModule);
