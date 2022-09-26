import "./style.css";

const NormalExam = ({ exam, position, ...props }) => {
  return (
    <article className="leaderboard__normalexam">
      <span className="position">{position + 1}</span>
      <span className="leaderboard__name">{exam.name}</span>
      <span className="leaderboard__value">
        <button
          className="btn-edit"
          onClick={() => props.handleClickUpdateExam(exam)}
        >
          <i className="fas fa-pencil-alt"></i>
        </button>
        <button
          className="btn-delete"
          onClick={(e) => props.handleDeleteExam(e, exam)}
        >
          <i className="fas fa-trash"></i>
        </button>
      </span>
    </article>
  );
};

export default NormalExam;
