import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


export const LuhnCheck = () => {
  const [imei, setImei] = useState("");
  const [checkDigit, setCheckDigit] = useState(null);


  const calculateCheckDigit = (imeiInput) => {
    if (!/^\d+$/.test(imeiInput) || imeiInput.length === 0) return null; // Ensure it's numeric


    let sum = 0;
    let isSecond = true; // Start from second-to-last


    for (let i = imeiInput.length - 1; i >= 0; i--) {
      let d = parseInt(imeiInput[i], 10);
      if (isSecond) d *= 2;
     
      sum += Math.floor(d / 10) + (d % 10);
      isSecond = !isSecond;
    }


    return (10 - (sum % 10)) % 10;
  };


  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setImei(value);
      setCheckDigit(calculateCheckDigit(value)); // Calculate on every change
    }
  };


  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h1 className="text-primary text-center">Luhn Check Digit Calculator</h1>
        <div className="mb-3">
          <label className="form-label">Enter IMEI Digits:</label>
          <input
            type="text"
            className="form-control"
            value={imei}
            onChange={handleChange}
            placeholder="Enter IMEI"
          />
        </div>
        {checkDigit !== null && imei.length > 0 && (
          <div className="mt-3 alert alert-success">
            <strong>Suggested IMEI:</strong> {imei}{checkDigit}
            <br />
            <strong>Check Digit:</strong> {checkDigit}
          </div>
        )}
      </div>
    </div>
  );
};
