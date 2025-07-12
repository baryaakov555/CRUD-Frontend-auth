import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBarStyles.css";

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/campuses">Campuses</Link>
      <div className="auth-buttons">
        {isAuthenticated ? (
          <button onClick={() => setIsAuthenticated(false)}>Logout</button>
        ) : (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/signup">
              <button>Signup</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
