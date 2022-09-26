import "../style.css";

const NormalModule = ({ module, position, handleDeleteModule }) => {
  return (
    <article className="leaderboard__normalmodule">
      <span className="position">{position + 1}</span>
      <span className="leaderboard__name">{module.name}</span>
      <span className="leaderboard__value">
        <span className="leaderboard__number-of-questions">
          {module.numberOfQuestion}
          <span> questions</span>
        </span>
        <button className="btn-delete">
          <i
            className="fas fa-trash"
            onClick={(event) => handleDeleteModule(event, module)}
          ></i>
        </button>
      </span>
    </article>
  );
};

export default NormalModule;
