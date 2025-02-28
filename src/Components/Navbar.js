import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [user, setUser] = useState(localStorage.getItem("username"));

  useEffect(() => {
    setRole(localStorage.getItem("role"));
    setUser(localStorage.getItem("username"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    alert("Logged out successfully!");
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark border-bottom mb-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
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
            {role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/products">
                  <i className="fa fa-shopping-cart me-2"></i>Products
                </Link>
              </li>
            )}
            {role === "user" && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/products">
                  <i className="fa fa-cubes me-2"></i>Products
                </Link>
              </li>
            )}
            {role === "user" && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/cart">
                  <i className="fa fa-shopping-cart me-2"></i>Add to cart
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav">
            {role ? (
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
