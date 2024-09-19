// src/pages/Login.tsx
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import Values from "../values";

interface LoginProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username && password) {
      try {
        const result = await axios.post(`${Values.url}/user/login`, {
          username,
          password,
        });

        localStorage.setItem("authToken", result.data.token);

        setIsAuthenticated(true);
      } catch (err) {
        // Type the error as AxiosError for better type safety
        const error = err as AxiosError;
        console.log(error.response?.data || error.message);
      }
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
