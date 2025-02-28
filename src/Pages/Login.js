import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Handle input changes and update formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/users/login/", formData);
      // alert("Login successfully!");
      window.location.href = "/Pages/IMEI";
      setFormData({ email: "", password: "" });
    } catch (error) {
      console.error("Login unsuccessful", error);
      // alert("Login unsuccessful");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "400px", width: "100%", borderRadius: "8px" }}
      >
        <h2 className="text-center mb-4 text-primary">Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your Email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter your Password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Message Display */}
          {message && (
            <div className={`text-center text-${messageType}`}>{message}</div>
          )}

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-100 py-2">
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-3">
          <p>
            Don't have an account?{" "}
            <a href="/Pages/Register" className="text-primary">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
