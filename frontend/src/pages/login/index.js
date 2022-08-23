import "./style.css";
import "./fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import { useState } from "react";
const Login = ({ handleSubmitLogin, messageLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleBlur = (event) => {
    if (event.target.value === "") {
      event.target.parentElement.classList.add("alert-validate");
    }
  };
  const handleFocus = (event) => {
    event.target.parentElement.classList.remove("alert-validate");
  };
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src={require("./images/img-01.png")} alt="IMG" />
          </div>

          <form
            name="form"
            onSubmit={(event) => handleSubmitLogin(event, username, password)}
            className="login100-form validate-form"
          >
            <span className="login100-form-title">Admin Login</span>
            {messageLogin && (
              <div className="error-message">{messageLogin}</div>
            )}
            <div
              className="wrap-input100 validate-input"
              data-validate="Username is required"
            >
              <input
                className="input100"
                type="text"
                name="username"
                value={username}
                placeholder="Username"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(event) => setUsername(event.target.value)}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-user" aria-hidden="true"></i>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(event) => setPassword(event.target.value)}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div className="container-login100-form-btn">
              <button className="login100-form-btn">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
