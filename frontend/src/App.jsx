import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./screens/LandingPage";
import { Dashboard } from "./screens/Dashboard";
import { MoviePage } from "./screens/MoviePage";
import { HeaderResponsive } from "./components/HeaderResponsive";

export const App = () => {
  return (
    <Router>
      <HeaderResponsive />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/MoviePage" element={<MoviePage />} />
      </Routes>
    </Router>
  );
};
