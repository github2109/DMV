const Module = ({ module }) => {
  return (
    <article className="leaderboard__profile">
      <span className="">1</span>
      <span className="leaderboard__name">{module.name}</span>
      <span className="leaderboard__value">
        35.7<span>B</span>
      </span>
    </article>
  );
};

export default Module;
