import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const LuhnCheck = () => {
  const [imei, setImei] = useState("");
  const [checkDigit, setCheckDigit] = useState(null);

  const calculateCheckDigit = (imei14) => {
    if (!/^\d{14}$/.test(imei14)) return null; // Ensure it's exactly 14 digits

    let sum = 0;
    let isSecond = true; // Start from second-to-last (rightmost is check digit)

    for (let i = imei14.length - 1; i >= 0; i--) {
      let d = parseInt(imei14[i], 10);
      if (isSecond) d *= 2;
      
      sum += Math.floor(d / 10) + (d % 10);
      isSecond = !isSecond;
    }

    const checkDigit = (10 - (sum % 10)) % 10;
    return checkDigit;
  };

  const handleCalculation = () => {
    const calculatedDigit = calculateCheckDigit(imei);
    setCheckDigit(calculatedDigit);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h1 className="text-primary text-center">Luhn Check Digit Calculator</h1>
        <div className="mb-3">
          <label className="form-label">Enter First 14 Digits of IMEI:</label>
          <input
            type="text"
            className="form-control"
            value={imei}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value) && e.target.value.length <= 14) {
                setImei(e.target.value);
              }
            }}
            placeholder="Enter 14-digit IMEI"
            maxLength={14}
          />
        </div>
        <button className="btn btn-primary w-100" onClick={handleCalculation}>
          Calculate Check Digit
        </button>
        {checkDigit !== null && (
          <div className="mt-3 alert alert-success">
            <strong>Complete IMEI:</strong> {imei}{checkDigit}
            <br />
            <strong>Check Digit:</strong> {checkDigit}
          </div>
        )}
      </div>
    </div>
  );
};
