import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import userService from "./services/user";
import tokenService from "./services/token";
import { useEffect, useState } from "react";
import Navigation from "./components/navigation";
import Home from "./pages/home";
import ModuleByLicense from "./pages/moduleByLicense";
import Licenses from "./pages/licenses";
import States from "./pages/states";
import "./style.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [messageLogin, setMessageLogin] = useState(null);
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJson !== null) {
      setUser(JSON.parse(loggedUserJson));
      tokenService.setToken(JSON.parse(loggedUserJson).token);
    }
  }, []);
  const handleSubmitLogin = async (event, username, password) => {
    event.preventDefault();
    if (username === "" || password === "") {
      setMessageLogin("Please fill your username and password");
      return;
    }
    try {
      const user = await userService.loginAdmin({ username, password });
      tokenService.setToken(user.token);
      setUser(user);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    } catch (error) {
      setMessageLogin(error.response.data.message);
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };
  if (!user)
    return (
      <Login
        handleSubmitLogin={handleSubmitLogin}
        messageLogin={messageLogin}
      />
    );
  return (
    <div className="parent-container">
      <Navigation handleLogout={handleLogout} user={user} />
      <Routes>
        <Route path="/licenses" exact={true} element={<Licenses />}></Route>
        <Route
          path="/modules"
          exact={true}
          element={<ModuleByLicense />}
        ></Route>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/states" exact={true} element={<States />}></Route>
      </Routes>
    </div>
  );
};

export default App;
