import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaDollarSign, FaSimCard } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("IsLoggedIn") === "true");

  // Effect to update login state when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("IsLoggedIn") === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Ensure we check localStorage each time the component renders
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("IsLoggedIn") === "true");
  }, []);

  // Function to handle protected navigation
  const handleNavigation = (path) => {
    const loggedIn = localStorage.getItem("IsLoggedIn") === "true"; // Get fresh value
    if (loggedIn) {
      navigate(path);
    } else {
      navigate("/Login"); 
    }
  };

  return (
    <div className="container my-5">
      <div
        className="container-fluid d-flex align-items-center justify-content-center text-white text-center py-5"
        style={{
          backgroundImage: "url('/firstbackgroundimage.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
        }}
      >
        <div>
          <h1 className="display-4">Phone Numbering Analyzer</h1>
          <p className="lead">PNA - By  Vignesh R. S.</p>
          {!isLoggedIn ? (
            <a href="/Login" className="btn btn-light btn-lg mt-3">
              Login
            </a>
          ) : (
            <a href="https://www.youtube.com/" className="btn btn-light btn-lg mt-3">
              Explore
            </a>
          )}
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="my-5">
        <div className="row text-center">
          <div className="col-4 mb-4">
            <div className="card shadow-sm" onClick={() => handleNavigation("/Pages/IMEI")} style={{ cursor: "pointer" }}>
              <div className="card-body">
                <FaMagnifyingGlass className="fa-3x text-primary mb-3" />
                <h4 className="card-title">IMEI Decoder</h4>
                <p className="card-text">Locate your device instantly using its IMEI number</p>
              </div>
            </div>
          </div>
          <div className="col-4 mb-4">
            <div className="card shadow-sm" onClick={() => handleNavigation("/Pages/IMSI")} style={{ cursor: "pointer" }}>
              <div className="card-body">
                <FaDollarSign className="fa-3x text-primary mb-3" />
                <h4 className="card-title">IMSI Decoder</h4>
                <p className="card-text">Discover the network provider linked to your IMSI</p>
              </div>
            </div>
          </div>
          <div className="col-4 mb-4">
            <div className="card shadow-sm" onClick={() => handleNavigation("/Pages/PhoneNumberFind")} style={{ cursor: "pointer" }}>
              <div className="card-body">
                <FaSimCard className="fa-3x text-primary mb-3" />
                <h4 className="card-title">SIM & Carrier Checker</h4>
                <p className="card-text">Discover details tied to your mobile number and SIM</p>
              </div>
            </div>
          </div>

          <div className="col-4 mb-4">
            <div className="card shadow-sm" onClick={() => handleNavigation("/Pages/ICCID")} style={{ cursor: "pointer" }}>
              <div className="card-body">
                <FaSimCard className="fa-3x text-primary mb-3" />
                <h4 className="card-title">ICCID Checker</h4>
                <p className="card-text">Easily retrieve and verify your SIM’s ICCID number</p>
              </div>
            </div>
          </div>
          <div className="col-4 mb-4">
            <div className="card shadow-sm" onClick={() => handleNavigation("/Pages/LuhnCheck")} style={{ cursor: "pointer" }}>
              <div className="card-body">
                <FaSimCard className="fa-3x text-primary mb-3" />
                <h4 className="card-title">Luhn Validator</h4>
                <p className="card-text">Check number validity using the Luhn algorithm</p>
              </div>
            </div>
          </div>
          <div className="col-4 mb-4">
            <div className="card shadow-sm" onClick={() => handleNavigation("/Pages/Tacfinder")} style={{ cursor: "pointer" }}>
              <div className="card-body">
                <FaSimCard className="fa-3x text-primary mb-3" />
                <h4 className="card-title">TAC Extractor</h4>
                <p className="card-text">Extract the device type from your IMEI’s TAC</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
