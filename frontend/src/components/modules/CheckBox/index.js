import "../style.css";
import CheckBoxModule from "../../module/CheckBox";
const CheckBoxModules = (props) => {
  return (
    <article className="leaderboard">
      <div className="leaderboard__profiles">
        {props.modules.map((module, position) => (
          <CheckBoxModule
            handleOnChangeCheckBox={(e) =>
              props.handleOnChangeCheckBox(e, position)
            }
            key={module._id}
            module={module}
            position={position}
          />
        ))}
      </div>
    </article>
  );
};

export default CheckBoxModules;
