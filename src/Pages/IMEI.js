import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export const IMEIFinder = () => {
  const [imei, setImei] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async () => {
    setSearched(true);
    setError("");
    setResult(null);

    // if (!imei || imei.length >= 8) {
    //   setError("Please enter tac code minimum 8 digits");
    //   return;
    // }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/tools/analyze-imei/", {
        imei: imei,
      });

      setResult(response.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 404) {
        navigate("/Pages/createimei");
      } else {
      setError(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
    }
  }
  };
  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">IMEI - International Mobile Equipment Identity</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Full IMEI Number or TAC Code"
            value={imei}
            onChange={(e) => setImei(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>

        {searched && error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}

        {searched && result && (
          <table className="table table-bordered table-striped mt-4">
            <thead className="table-dark text-center">
              <tr>
                <th>IMEI / TAC Code</th>
                <th>Device</th>
                <th>Model</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td>{result.imei}</td>
                <td>{result.brand}</td>
                <td>{result.device}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default IMEIFinder;
