import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Todo from "./pages/Todo";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (status, name) => {
    setIsLoggedIn(status);
    setUserName(name);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserName("");
  };

  return (
    <Router>
      <DefaultLayout
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogout={handleLogout}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/todo" element={<Todo isAuthenticated={isLoggedIn} />} />
          <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </DefaultLayout>
    </Router>
  );
}

export default App;
