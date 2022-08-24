import "./style.css"

const Module = ({ module,position }) => {
  return (
    <article className="leaderboard__profile">
      <span className="position">{position + 1}</span>
      <span className="leaderboard__name">{module.name}</span>
      <span className="leaderboard__value">
        {module.numberOfQuestion}<span> questions</span>
      </span>
    </article>
  );
};

export default Module;
