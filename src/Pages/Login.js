import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    eMail: "",
    password: "",
  });

  // localStorage.setItem("IsLoggedIn", false);
  // Handle input changes and update formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // await axios.post("http://127.0.0.1:8000/api/users/login/", formData);
      localStorage.setItem("IsLoggedIn", "true");
      localStorage.setItem("User", formData.eMail);
      alert("Login successfully!");
      window.location.href = "/";
      setFormData({ eMail: "", password: "" });
    } catch (error) {
      console.error("Login unsuccessful", error);
      alert("Login unsuccessful");
    }
  };

  return (
    <div
      className="container-fluid d-flex align-items-center"
      style={{
        height: "90vh",
        overflow: "hidden",
        backgroundImage: "url('/loginPage.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {/* Enhanced Glassmorphism Login Card */}
      <div
        className="p-4 shadow-lg ms-auto me-5"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "12px",
          backdropFilter: "blur(10px)", // Blurred background effect
          background: "rgba(255, 255, 255, 0.15)", // Semi-transparent white
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)", // Soft shadow for depth
          border: "2px solid rgba(255, 255, 255, 0.3)", // Subtle border
          padding: "30px",
        }}
      >
        <h2 className="text-center mb-4 text-light" style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}>
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your Email"
              name="email"
              required
              value={formData.eMail}
              onChange={(e) => setFormData({ ...formData, eMail: e.target.value })}
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "12px",
              }}
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <input
              type="password"
              value={formData.password}
              placeholder="Enter your password"
              className="form-control form-control-lg"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "12px",
              }}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn w-100 py-2"
            style={{
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-3">
          <p className="text-light">
            Don't have an account? <a href="/Pages/Register" className="text-warning">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
