import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export const IMSIFinder = () => {
  const [imsi, setImsi] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    setSearched(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/tools/analyze-imsi/", {
        imsi: imsi.trim(),
      });

      setResult(response.data);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">IMSI - International Mobile Subscriber Identity</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter 15-digit IMSI number"
            value={imsi}
            onChange={(e) => setImsi(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>

        {searched && (
          <>
            {error ? (
              <p className="text-danger text-center">{error}</p>
            ) : result ? (
              <table className="table table-bordered table-striped">
                <thead className="table-dark text-center">
                  <tr>
                    <th>Whole IMSI</th>
                    <th>MCC</th>
                    <th>MNC</th>
                    <th>Carrier Name</th>
                    <th>Country Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{result.imsi}</td>
                    <td>{result.mcc}</td>
                    <td>{result.mnc}</td>
                    <td>{result.network || "N/A"}</td>
                    <td>{result.country}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p className="text-center">No result found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default IMSIFinder;
