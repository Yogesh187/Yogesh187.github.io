import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


export const TacFinder = () => {
  const [imei, setImei] = useState("");
  const [tac, setTac] = useState("");


  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setImei(value);
    }
  };


  const extractTAC = () => {
    if (imei.length !== 15) {
      setTac("Invalid IMEI");
    } else {
      setTac(imei.substring(0, 8));
    }
  };


  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h1 className="text-primary text-center">TAC Identifier</h1>
        <div className="mb-3">
          <label className="form-label">Enter the IMEI Number (15 digits)</label>
          <input
            type="text"
            className="form-control"
            value={imei}
            onChange={handleInputChange}
            placeholder="Enter the IMEI number"
            maxLength={15}
          />
        </div>
        <button className="btn btn-primary w-100" onClick={extractTAC}>
          Extract TAC
        </button>
        {tac && (
          <div
            className={`mt-3 alert ${
              tac === "Invalid IMEI" ? "alert-danger" : "alert-success"
            }`}
          >
            <strong>{tac === "Invalid IMEI" ? tac : `Your TAC Code:  ${tac}`}</strong>
          </div>
        )}
      </div>
    </div>
  );
};

