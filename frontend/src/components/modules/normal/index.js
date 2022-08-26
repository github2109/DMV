import "../style.css";
import { connect } from "react-redux";
import NormalModule from "../../module/normal";
const NormalModules = (props) => {
  return (
    <div className="modules-container">
    <article className="leaderboard">
      <main className="leaderboard__profiles">
        {props.modules.map((module,position) => (
          <NormalModule key={module._id} module={module} position={position}/>
        ))}
      </main>
    </article>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    modules: state.modules
  };
};


export default connect(mapStateToProps)(NormalModules);
