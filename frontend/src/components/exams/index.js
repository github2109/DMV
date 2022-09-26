import "./style.css";

import { connect } from "react-redux";
import NormalExam from "../../components/exam";
const NormalExams = (props) => {
  const listExams = props.states;
  return (
    <div className="exams-container">
      <article className="leaderboard">
        <main className="leaderboard__profiles">
          {listExams.map((exam, position) => (
            <NormalExam key={exam._id} exam={exam} position={position} />
          ))}
        </main>
      </article>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    exams: state.exams,
  };
};
export default connect(mapStateToProps)(NormalExams);
