import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import userService from "./services/user";
import tokenService from "./services/token";
import { useEffect, useState } from "react";
import Navigation from "./components/navigation";
import Home from "./pages/home";
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
    <div>
      <Navigation handleLogout={handleLogout} user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
