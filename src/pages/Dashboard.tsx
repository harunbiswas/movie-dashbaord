// src/pages/Dashboard.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AddMovie from "./AddMovie";
import Home from "./Index";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/addmovie" element={<AddMovie />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
