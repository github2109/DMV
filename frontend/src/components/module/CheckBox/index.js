import { useState } from "react";
import "../style.css";

const CheckBoxModule = ({ module, position, handleClickModule }) => {
  return (
    <article className="leaderboard__checkboxmodule">
      <label onClick={() => handleClickModule(position)}>
        <input type="checkbox" className="option-input-checkbox" />
        <span className="leaderboard__name">{module.name}</span>
        <span className="leaderboard__value">
          {module.numberOfQuestion}
          <span> questions</span>
        </span>
      </label>
    </article>
  );
};

export default CheckBoxModule;
