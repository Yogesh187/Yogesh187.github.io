import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export const CreateICCID = () => {
  const [mcc, setMcc] = useState("");
  const [mnc, setMnc] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [network, setNetwork] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleCreate = async () => {
    setMessage("");
    setError("");

    if (!mcc || !mnc || !country || !countryCode || !network) {
      setError("All fields (MCC, MNC, Country, Country Code, Network) are required.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/tools/create-iccid/", {
        mcc: parseInt(mcc),
        mnc: parseInt(mnc),
        country: country,
        country_code: parseInt(countryCode),
        network: network,
      });

      setMessage(response.data.message || "ICCID record created successfully!");
      setMcc("");
      setMnc("");
      setCountry("");
      setCountryCode("");
      setNetwork("");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Create ICCID Record</h2>

        <div className="mb-3">
          <label className="form-label">MCC (Mobile Country Code)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter MCC"
            value={mcc}
            onChange={(e) => setMcc(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">MNC (Mobile Network Code)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter MNC"
            value={mnc}
            onChange={(e) => setMnc(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Country</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Country Code</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Country Code"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Network</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Network"
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
          />
        </div>

        <div className="text-center">
          <button className="btn btn-success" onClick={handleCreate}>
            Create Record
          </button>
        </div>

        {error && <div className="alert alert-danger text-center mt-3">{error}</div>}
        {message && <div className="alert alert-success text-center mt-3">{message}</div>}
      </div>
    </div>
  );
};

export default CreateICCID;
