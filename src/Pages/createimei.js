import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export const CreateIMEI = () => {
  const [tac, setTac] = useState("");
  const [brand, setBrand] = useState("");
  const [devices, setDevices] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleCreate = async () => {
    setMessage("");
    setError("");

    if (!tac || !brand || !devices) {
      setError("All fields (TAC, Brand, Devices) are required.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/tools/create-imei/", {
        tac: tac,
        brand: brand,
        devices: devices,
      });

      setMessage(response.data.message || "Record created successfully!");
      setTac("");
      setBrand("");
      setDevices("");
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
        <h2 className="text-center mb-4">Create IMEI Record</h2>

        <div className="mb-3">
          <label className="form-label">TAC</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter TAC"
            value={tac}
            onChange={(e) => setTac(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Brand</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Devices</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Devices"
            value={devices}
            onChange={(e) => setDevices(e.target.value)}
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

export default CreateIMEI;
