
import "../style.css";

const CheckBoxModule = ({ module, position, handleClickModule }) => {
  return (
    <article className="leaderboard__checkboxmodule">
      <label onClick={() => handleClickModule(position)}>
        <input type="checkbox" className="option-input-checkbox" />
        <span className="leaderboard__name">{module.name}</span>
      </label>
    </article>
  );
};

export default CheckBoxModule;
