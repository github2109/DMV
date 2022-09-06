import "../style.css";
import "../../../fontawesome/b96f916ae2"
const DrawModule = ({
  module,
  position,
  handleSelectModule,
  handleDeleteModule,
}) => {
  return (
    <article className="leaderboard__drawmodule">
      <span className="position">{position + 1}</span>
      <span className="leaderboard__name">{module.name}</span>
      <span className="leaderboard__value">
        <button className="btn-edit">
          <i
            className="fas fa-pencil-alt"
            onClick={handleSelectModule}
          ></i>
        </button>
        <button className="btn-delete">
          <i
            className="fas fa-trash"
            onClick={handleDeleteModule}
          ></i>
        </button>
      </span>
    </article>
  );
};

export default DrawModule;
