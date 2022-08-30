import "./style.css";
import "../../fontawesome/b96f916ae2";
import { Link } from "react-router-dom";
const Select = ({ listData, className, nameSelect, item, setItem }) => {
  const handleClick = (event) => {
    const title = document.getElementById(nameSelect);
    if (title !== null) {
      title.remove();
    }
    setItem(event.target.id);
  };
  return (
    <div className={`select-settings-container ${className}`}>
      <div className="select-box">
        <div className="select-box__current" tabIndex="1">
          <div className="select-box__value">
            <input
              className="select-box__input"
              type="radio"
              id={nameSelect}
              defaultChecked={item === null ? true : false}
            />
            <p className="select-box__input-text">Select {nameSelect}</p>
          </div>
          {listData.map((data) => (
            <div key={data._id} className="select-boxbox__value">
              <input
                className="select-box__input"
                type="radio"
                id={data._id}
                value={data.name}
                name={nameSelect}
                defaultChecked={item === data._id ? true : false}
                onClick={handleClick}
              />
              <p className="select-box__input-text">{data.name}</p>
            </div>
          ))}
          <img
            className="select-box__icon"
            src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
            alt="Arrow Icon"
            aria-hidden="true"
          />
        </div>
        <ul className="select-box__list">
          {listData.map((data) => (
            <li key={data._id}>
              <label
                className="select-box__option"
                htmlFor={data._id}
                aria-hidden="aria-hidden"
              >
                {data.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <Link to={`/${nameSelect}s`} style={{ textDecoration: 'none' }}>
        <div className="setting-button">
          <i className="setting-icon fa fa-cog" aria-hidden="true"></i>
        </div>
      </Link>
    </div>
  );
};

export default Select;
