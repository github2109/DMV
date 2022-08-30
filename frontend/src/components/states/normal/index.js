import "../style.css";

import { connect } from "react-redux";
import NormalState from "../../state/normal";
const NormalStates = (props) => {
  const listStates = props.states;
  const handleUpdateState = props.handleUpdateState;
  const handleDeleteState = props.handleDeleteState;
  return (
    <div className="states-container">
      <article className="leaderboard">
        <main className="leaderboard__profiles">
          {listStates.map((state, position) => (
            <NormalState
              key={state._id}
              state={state}
              position={position}
              handleUpdateState={handleUpdateState}
              handleDeleteState={handleDeleteState}
            />
          ))}
        </main>
      </article>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    states: state.states,
  };
};
export default connect(mapStateToProps)(NormalStates);
