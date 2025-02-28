import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToterms] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%", borderRadius: "8px" }}>
        <h2 className="text-center mb-4 text-primary">Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <input
              type="tel"
              className="form-control form-control-lg"
              placeholder="Enter your Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="checkbox"
              className="form-check-input"
              name="agreeToTerms"
              onChange={(e) => setAgreeToterms(e.target.value)}
            />
            <label className="form-check-label">I agree with terms and conditions</label>
      
          </div>


          {/* Message Display */}
          {message && <div className={`text-center text-${messageType}`}>{message}</div>}

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-100 py-2">
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-3">
          <p>
            Don't have an account? <a href="/Pages/Register" className="text-primary">Sign Up</a>
          </p>
        </div>
      </div >
    </div >
  );
};

export default Login;
