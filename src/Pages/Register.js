import React, { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    passWord:"",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value) error = "Name is required.";
        else if (!/^[A-Za-z\s]+$/.test(value)) error = "Name should contain only letters.";
        break;
      case "email":
        if (!value) error = "Email is required.";
        else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value))
          error = "Enter a valid email.";
        break;
      case "phoneNumber":
        if (!value) error = "Phone number is required.";
        else if (!/^\d{10}$/.test(value))
          error = "Enter a valid 10-digit phone number.";
        break;
        case "passWord":
          if (!value) {
            error = "Password is required.";
          } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?,./]).{8,}$/.test(value)) {
            error = "Password must be at least 8 characters long, contain uppercase, lowercase, a number, and a special character.";
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card p-4 shadow-sm">
            <div className="card-header text-center">
              <h2 className="text-primary">Registration Form</h2>
            </div>
            <div className="card-body">
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
                    placeholder="Email"
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
                  />
                  {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber}</span>}
                </div>
                <div className="mb-3">
                 
                  <input
                    type="text"
                    className="form-control"
                    name="passWord"
                    value={formData.passWord}
                    onChange={handleChange}
                    placeholder="Enter your Password"
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
                  <label className="form-check-label">I agree with terms and conditions</label>
                  {errors.agreeToTerms && <div className="text-danger">{errors.agreeToTerms}</div>}
                </div>

                {/* Submit Button */}
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
