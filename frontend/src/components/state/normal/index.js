import "../style.css";

const NormalState = ({
  state,
  position,
  handleUpdateState,
  handleDeleteState,
}) => {
  return (
    <article className="leaderboard__normalstate">
      <span className="position">{position + 1}</span>
      <span className="leaderboard__name">{state.name}</span>
      <span className="leaderboard__value">
        <button className="btn-edit">
          <i
            className="fas fa-pencil-alt"
            onClick={(event) => handleUpdateState(state)}
          ></i>
        </button>
        <button className="btn-delete">
          <i
            className="fas fa-trash"
            onClick={(event) => handleDeleteState(event, state)}
          ></i>
        </button>
      </span>
    </article>
  );
};

export default NormalState;
