import "./style.css";
import "../../fontawesome/b96f916ae2";
import { Link } from "react-router-dom";
const Navigation = ({ handleLogout, user }) => {
  return (
    <div>
      <nav className="main-menu">
        <div></div>
        <div className="settings">
          <i className="icon fa-solid fa-user"></i>
          <span className="nav-text username">{user.username}</span>
        </div>
        <div className="scrollbar" id="style-1">
          <ul>
            <li>
              <Link to="/">
                <i className="icon fa-solid fa-house"></i>
                <span className="nav-text">Home</span>
              </Link>
            </li>

            <li>
              <Link to="/messenger">
                <i className="icon fab fa-facebook-messenger"></i>
                <span className="nav-text">Messenger</span>
              </Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogout}>
                <i className="icon fa-solid fa-right-from-bracket"></i>
                <span className="nav-text">Log out</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
