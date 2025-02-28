import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-top footer text-muted">
      <div className="container">
        &copy; 2025 - MVC - <Link to="/privacy">Privacy</Link>
      </div>
    </footer>
  );
}

export default Footer;
