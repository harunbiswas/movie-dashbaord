// src/pages/Login.tsx
import React, { useState } from "react";

interface LoginProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform authentication here (e.g., API call)
    if (username === "admin" && password === "1234") {
      localStorage.setItem("authToken", "someAuthToken");

      setIsAuthenticated(true);
    }
  };

  return (
    <div className="login-wrp">
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
