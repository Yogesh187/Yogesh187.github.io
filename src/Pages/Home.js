import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaDollarSign, FaSimCard } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("IsLoggedIn") == "true");

  return (
    <div className="container my-5" style={{ position: 'relative', objectFit: 'cover' }}>
      <div
        className="container-fluid d-flex align-items-center justify-content-center text-white text-center py-5"
        style={{
          backgroundImage: "url('/firstbackgroundimage.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px"
        }}
      >
        <div>
          <h1 className="display-4">International Numbering Plans</h1>
          <p className="lead">Your one-stop solution for all service!</p>
          {!isLoggedIn ? <a href="/Login" className="btn btn-light btn-lg mt-3">
            Login
          </a> : <a href="/Pages/Tacfinder" className="btn btn-light btn-lg mt-3">
            Explore
          </a>}

        </div>
      </div>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="my-5">
        {/* <h2 className="text-center mb-4">Why Choose Us?</h2> */}
        <div className="row text-center">
          <div className="col-6 mb-4">
            <div className="card shadow-sm" onClick={() => navigate("/Pages/IMEI")} style={{ cursor: "pointer" }}>
              <div className="card-body">
                <FaMagnifyingGlass className="fa-3x text-primary mb-3" />
                <h4 className="card-title">IMEI Finder</h4>
                <p className="card-text">Simplest way to find your device with IMEI number.</p>
              </div>
            </div>
          </div>
          <div className="col-6 mb-4">
            <div className="card shadow-sm" onClick={() => navigate("/Pages/IMSI")} style={{ cursor: "pointer" }}>
              <div className="card-body">
                <FaDollarSign className="fa-3x text-primary mb-3" />
                <h4 className="card-title">IMSI Finder</h4>
                <p className="card-text">Simplest way to find your service provider with IMSI number.</p>
              </div>
            </div>
          </div>
          <div className="col-6 mb-4">
            <div className="card shadow-sm" onClick={() => navigate("/Pages/SIM")} style={{ cursor: "pointer" }}>
              <div className="card-body">
                <FaSimCard className="fa-3x text-primary mb-3" />
                <h4 className="card-title">SIM Finder</h4>
                <p className="card-text">Simplest way to find your SIM by number.</p>
              </div>
            </div>
          </div>
          <div className="col-6 mb-4">
            <div className="card shadow-sm" onClick={() => navigate("/Pages/Tacfinder")} style={{ cursor: "pointer" }}>
              <div className="card-body">
                <FaSimCard className="fa-3x text-primary mb-3" />
                <h4 className="card-title">TAC Finder</h4>
                <p className="card-text">Simplest way to find your SIM by number.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="my-5 text-center">
        <h2>Get in Touch</h2>
        <p>If you have any questions or need assistance, feel free to reach out to us. We're here to help!</p>
        <p><strong>Email:</strong> <a href="mailto:support@tcsgroceryshop.com">support@inns.com</a></p>
        <p><strong>Phone:</strong> <a href="tel:+11234567890">+91 9876543210</a></p>
      </section>
    </div>
  );
};

export default HomePage;
