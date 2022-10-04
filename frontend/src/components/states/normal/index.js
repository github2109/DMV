import "../style.css";

import { useSelector } from "react-redux";
import NormalState from "../../state/normal";

const NormalStates = ({ handleUpdateState, handleDeleteState }) => {
  const listStates = useSelector((state) => state.states);

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

export default NormalStates;
