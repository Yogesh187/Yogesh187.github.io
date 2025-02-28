import React from "react";
import { FaDollarSign,FaSimCard } from "react-icons/fa"; // Icons for "Why Choose Us" section
import { FaMagnifyingGlass } from "react-icons/fa6";

const HomePage = () => {
  return (
    <div className="container my-5">

      {/* Hero Section */}
      <div className="jumbotron jumbotron-fluid text-center text-white bg-primary py-5">
        <div className="container">
          <h1 className="display-4">International Numbering Plans</h1>
          <p className="lead">
            Your one-stop solution for all service!
          </p>
          <a href="#why-choose-us" className="btn btn-light btn-lg mt-3">Discover More</a>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="my-5">
        <h2 className="text-center mb-4">Why Choose Us?</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
              <FaMagnifyingGlass  icon="fa-solid fa-magnifying-glass" />
                <h4 className="card-title">IMEI finder</h4>
                <p className="card-text">
                  Simplest way to find your device with IMEI number.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <FaDollarSign className="fa-3x text-primary mb-3" />
                <h4 className="card-title">IMSI</h4>
                <p className="card-text">
                Simplest way to find your service provider  with IMSI number.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <FaSimCard className="bi bi-sim text-primary mb-3" />
                <h4 className="card-title">SIM</h4>
                <p className="card-text">
                Simplest way to find your sim by number.
                </p>
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
