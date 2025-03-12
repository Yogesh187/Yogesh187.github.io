
import React, { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    passWord: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value) error = "Name is required.";
        else if (!/^[A-Za-z\s]+$/.test(value)) error = "Only letters are allowed.";
        break;
      case "email":
        if (!value) error = "Email is required.";
        else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) error = "Enter a valid email.";
        break;
      case "phoneNumber":
        if (!value) error = "Phone number is required.";
        else if (!/^\d{10}$/.test(value)) error = "Enter a valid 10-digit phone number.";
        break;
      case "passWord":
        if (!value) {
          error = "Password is required.";
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?,./]).{8,}$/.test(value)) {
          error = "Password must be 8+ characters with uppercase, lowercase, a number, and a special character.";
        }
        break;
      case "agreeToTerms":
        if (!value) error = "You must agree to terms.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    validateField(name, newValue);
  };

  const validateForm = () => {
    Object.keys(formData).forEach((key) => validateField(key, formData[key]));
    return Object.values(errors).every((error) => error === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("Submitting Data:", formData);
  };

  return (
    <div
      className="container-fluid vh-100 d-flex align-items-center"
      style={{
        backgroundImage: "url('/signup1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {/* Enhanced Glassmorphism Register Card */}
      <div
        className="p-4 shadow-lg ms-auto me-5"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "12px",
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          border: "2px solid rgba(255, 255, 255, 0.3)",
          padding: "30px",
        }}
      >
        <h2 className="text-center mb-4 text-light" style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}>
          Register
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your Name"
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "12px",
              }}
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "12px",
              }}
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>

          {/* Phone Field */}
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "12px",
              }}
            />
            {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber}</span>}
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              name="passWord"
              value={formData.passWord}
              onChange={handleChange}
              placeholder="Enter your Password"
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "12px",
              }}
            />
            {errors.passWord && <span className="text-danger">{errors.passWord}</span>}
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
            />
            <label className="form-check-label text-light">I agree with terms and conditions</label>
            {errors.agreeToTerms && <div className="text-danger">{errors.agreeToTerms}</div>}
          </div>

          {/* Submit Button */}
          <div className="d-grid gap-2">
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
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
