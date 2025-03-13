import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("IsLoggedIn") == "true");
  const [user, setUser] = useState(localStorage.getItem("User"));

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("IsLoggedIn") == "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("IsLoggedIn");
    localStorage.removeItem("User");
    alert("Logged out successfully!");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark border-bottom">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="/logo.png"
            alt="Logo"
            style={{ height: "30px", marginRight: "8px" }}
          />
          INNS
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
          <ul className="navbar-nav flex-grow-1">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                <i className="fa fa-home me-2"></i>Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/Pages/Tacfinder">
                <i className="fa fa-search me-2"></i>Tac Finder
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/Pages/LuhnCheck">
                <i className="fa fa-check me-2"></i>Luhn Check
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/Pages/CountryCode">
                <i className="fa fa-globe me-2"></i>CountryCode
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/Pages/PhoneNumberFind">
                <i className="fa fa-phone me-2"></i>Phone Number
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <button className="btn btn-dark">
                    <i className="fa fa-user me-2"></i> {user}
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-outline-light" to="/Login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
