import "./style.css";
import { useSelector } from "react-redux";
import NormalExam from "../../components/exam";

const NormalExams = () => {
  const listExams = useSelector(state => state.exams);
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

export default NormalExams;
