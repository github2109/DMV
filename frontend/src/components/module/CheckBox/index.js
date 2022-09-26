import "../style.css";
import { useState } from "react";
const CheckBoxModule = ({ module, handleOnChangeCheckBox }) => {
  const [checked, setChecked] = useState(module.isChoose);
  const handleClick = () => {
    setChecked(!checked);
  };
  return (
    <article className="leaderboard__checkboxmodule" onClick={handleClick}>
      <label>
        <input
          defaultChecked={checked}
          onChange={handleOnChangeCheckBox}
          type="checkbox"
          className="option-input-checkbox"
        />
        <span className="leaderboard__name">{module.name}</span>
      </label>
    </article>
  );
};

export default CheckBoxModule;
