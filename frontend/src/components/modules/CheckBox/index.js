import "../style.css";
import CheckBoxModule from "../../module/CheckBox";
const CheckBoxModules = (props) => {
  return (
    <article className="leaderboard">
      <main className="leaderboard__profiles">
        {props.modules.map((module, position) => (
          <CheckBoxModule
            handleClickModule={props.handleClickModule}
            key={module._id}
            module={module}
            position={position}
          />
        ))}
      </main>
    </article>
  );
};

export default CheckBoxModules;
