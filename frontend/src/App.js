import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Admin/Login";
import Register from "./Admin/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Inventory from "./Pages/Inventory/Inventory";
import AdminInfo from "./Pages/AdminAuth/AdminInfo";
import UserTrack from "./Pages/Tracking/UserTrack";
import MyInfo from "./Admin/MyInfo";
import "bootstrap/dist/css/bootstrap.min.css";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/inventory"
            element={isAuthenticated ? <Inventory /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin-info"
            element={isAuthenticated ? <AdminInfo /> : <Navigate to="/login" />}
          />
          <Route
            path="/user-track"
            element={isAuthenticated ? <UserTrack /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <MyInfo /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
