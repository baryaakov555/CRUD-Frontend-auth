import React from "react";
import { createRoot } from "react-dom/client";
import "./AppStyles.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { API_URL } from "./shared";
import CampusList from "./components/CampusList";
import Student from "./components/AddStudent";
import SingleCampus from "./components/SingleCampus";
import AddStudent from "./components/AddStudent";
import SingleStudent from "./components/SingleStudent";

const App = () => {
  return (
    <div className="app-container">
      <NavBar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<h1 className="page-title">Home Page</h1>} />

          <Route
            path="/campuses"
            element={
              <>
                <h1 className="page-title">All Campuses</h1>
                <CampusList />
              </>
            }
          />

          <Route
            path="/campuses/:id"
            element={
              <>
                <SingleCampus />
              </>
            }
          />

          <Route
            path="/students/:id"
            element={
              <>
                <SingleStudent />
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
